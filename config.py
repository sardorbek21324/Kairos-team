"""Configuration for Kairos Discord bot.

Set DISCORD_TOKEN via environment variable for production use.
"""
import os

# Discord bot token
token: str = os.getenv("DISCORD_TOKEN", "")

# Role IDs
EDITOR_ROLE_ID: int = 1442942510065516544  # Монтажёр
OPERATOR_ROLE_ID: int = 1442942699144609962  # Оператор
CEO_ROLE_ID: int = 1442943268412194816  # CEO Kairos Team

# Shooting channels
SHOOTING_CATEGORY_ID: int = 1442879859264323674
SHOOTING_REPORT_CHANNEL_ID: int = 1442879984682401942  # отчётность
SHOOTING_REVIEW_CHANNEL_ID: int = 1442888528752017628  # проверка

# Editing channels
EDITING_CATEGORY_ID: int = 1442879673099882527
EDITING_REPORT_CHANNEL_ID: int = 1442880740537925662  # отчётность
EDITING_REVIEW_CHANNEL_ID: int = 1442888546871545886  # проверка

# Global settings
COMMAND_GUILD_IDS: tuple[int, ...] | None = None  # set to guild IDs for faster sync if desired
