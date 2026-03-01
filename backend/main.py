import os
import time
from collections import defaultdict, deque
from typing import Deque, Dict

import json
from urllib import request as urllib_request
from urllib.error import URLError
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

app = FastAPI()


def _csv_env(name: str) -> list[str]:
    raw = os.getenv(name, "")
    return [x.strip() for x in raw.split(",") if x.strip()]


origins = _csv_env("ALLOWED_ORIGINS")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["Content-Type"],
    max_age=86400,
)

DEFAULT_TARGET_CHAT_ID = "-1003882605920"


class LeadRequest(BaseModel):
    name: str = Field(min_length=1)
    email: str = Field(min_length=3)
    message: str = Field(min_length=1)


_RATE_LIMIT_WINDOW_SECONDS = 60
_request_log: Dict[str, Deque[float]] = defaultdict(deque)


def _allowed_origins() -> set[str]:
    origins_csv = os.getenv("ALLOWED_ORIGINS", "")
    return {origin.strip() for origin in origins_csv.split(",") if origin.strip()}


def _get_client_ip(request: Request) -> str:
    forwarded_for = request.headers.get("x-forwarded-for")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()

    if request.client and request.client.host:
        return request.client.host

    return "unknown"


def _check_rate_limit(client_ip: str) -> None:
    limit = int(os.getenv("RATE_LIMIT_PER_MIN", "10"))
    now = time.time()
    timestamps = _request_log[client_ip]

    while timestamps and now - timestamps[0] > _RATE_LIMIT_WINDOW_SECONDS:
        timestamps.popleft()

    if len(timestamps) >= limit:
        raise HTTPException(status_code=429, detail="Too many requests")

    timestamps.append(now)


def _require_allowed_origin(request: Request) -> None:
    allowlist = _allowed_origins()
    if not allowlist:
        return

    origin = request.headers.get("origin")
    if origin and origin in allowlist:
        return

    raise HTTPException(status_code=403, detail="Origin not allowed")


def _get_bot_token() -> str:
    token = os.getenv("TG_BOT_TOKEN") or os.getenv("BOT_TOKEN")
    if not token:
        raise HTTPException(status_code=500, detail="Bot token is not configured")
    return token


def _get_target_chat_id() -> str:
    return os.getenv("TARGET_CHAT_ID", DEFAULT_TARGET_CHAT_ID)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/lead")
def submit_lead(payload: LeadRequest, request: Request) -> JSONResponse:
    if "@" not in payload.email:
        raise HTTPException(status_code=422, detail="Invalid email")
    _require_allowed_origin(request)
    client_ip = _get_client_ip(request)
    _check_rate_limit(client_ip)

    token = _get_bot_token()
    target_chat_id = _get_target_chat_id()

    text = (
        "📩 New lead\n"
        f"Name: {payload.name}\n"
        f"Email: {payload.email}\n"
        f"Message: {payload.message}"
    )

    telegram_request = urllib_request.Request(
        f"https://api.telegram.org/bot{token}/sendMessage",
        data=json.dumps({"chat_id": target_chat_id, "text": text}).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urllib_request.urlopen(telegram_request, timeout=10) as response:
            response_body = json.loads(response.read().decode("utf-8"))
    except (URLError, json.JSONDecodeError):
        return JSONResponse(
            status_code=502,
            content={"ok": False, "error": "telegram_send_failed"},
        )

    if not response_body.get("ok"):
        return JSONResponse(
            status_code=502,
            content={"ok": False, "error": "telegram_send_failed"},
        )

    return JSONResponse(status_code=200, content={"ok": True})
