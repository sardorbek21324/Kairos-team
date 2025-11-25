"""Configuration for Kairos Discord bot.

Values are loaded from environment variables (``.env`` is supported).
"""
from __future__ import annotations

import os
from typing import Iterable, TypeVar

from dotenv import load_dotenv

load_dotenv()

_T = TypeVar("_T")


def _get_env_int(name: str, default: _T) -> int | _T:
    raw_value = os.getenv(name)
    if raw_value is None or raw_value == "":
        return default

    try:
        return int(raw_value)
    except ValueError as exc:  # pragma: no cover - defensive
        raise ValueError(f"Environment variable {name} must be an integer, got: {raw_value!r}") from exc


def _get_env_int_tuple(name: str, default: Iterable[int] | None) -> tuple[int, ...] | None:
    raw_value = os.getenv(name)
    if raw_value is None or raw_value.strip() == "":
        return tuple(default) if default is not None else None

    try:
        return tuple(int(part.strip()) for part in raw_value.split(",") if part.strip())
    except ValueError as exc:  # pragma: no cover - defensive
        raise ValueError(
            f"Environment variable {name} must be a comma-separated list of integers, got: {raw_value!r}"
        ) from exc


# Discord bot token and IDs
token: str = os.getenv("DISCORD_TOKEN", "")
BOT_USER_ID: int | None = _get_env_int("BOT_USER_ID", None)

# Role IDs
EDITOR_ROLE_ID: int = _get_env_int("EDITOR_ROLE_ID", 1442942510065516544)  # Монтажёр
OPERATOR_ROLE_ID: int = _get_env_int("OPERATOR_ROLE_ID", 1442942699144609962)  # Оператор
CEO_ROLE_ID: int = _get_env_int("CEO_ROLE_ID", 1442943268412194816)  # CEO Kairos Team

# Shooting channels
SHOOTING_CATEGORY_ID: int = _get_env_int("SHOOTING_CATEGORY_ID", 1442879859264323674)
SHOOTING_REPORT_CHANNEL_ID: int = _get_env_int("SHOOTING_REPORT_CHANNEL_ID", 1442879984682401942)  # отчётность
SHOOTING_REVIEW_CHANNEL_ID: int = _get_env_int("SHOOTING_REVIEW_CHANNEL_ID", 1442888528752017628)  # проверка

# Editing channels
EDITING_CATEGORY_ID: int = _get_env_int("EDITING_CATEGORY_ID", 1442879673099882527)
EDITING_REPORT_CHANNEL_ID: int = _get_env_int("EDITING_REPORT_CHANNEL_ID", 1442880740537925662)  # отчётность
EDITING_REVIEW_CHANNEL_ID: int = _get_env_int("EDITING_REVIEW_CHANNEL_ID", 1442888546871545886)  # проверка

# Global settings
COMMAND_GUILD_IDS: tuple[int, ...] | None = _get_env_int_tuple("COMMAND_GUILD_IDS", None)  # Comma-separated IDs
