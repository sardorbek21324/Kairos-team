# Kairos Team Discord Workflow Bot

Production-ready Discord bot for handling shooting and editing reports via slash commands, modals, and persistent buttons. Built with `discord.py 2.6.4` for modern Interaction support.

## Requirements
- Python 3.11+
- Discord bot token with the required intents enabled (Server Members intent).

Install dependencies:
```bash
pip install -r requirements.txt
```

## Configuration
Set the bot token via environment variable before running:
```bash
export DISCORD_TOKEN="YOUR_BOT_TOKEN"
```

All server IDs and role IDs are pre-configured in `config.py`:
- Roles: Operator, Editor, CEO.
- Channels: Shooting and Editing categories with reporting/review channels.

(Optional) If you prefer, you can hardcode the token in `config.py` (not recommended for production).

## Running the bot
```bash
python bot.py
```
The bot will sync its slash commands on startup.

## Slash commands
Run these commands **inside the target reporting channels**:
- `/setup_shooting_panel` — Creates the shooting report panel. Only the CEO role can invoke this.
- `/setup_editing_panel` — Creates the editing report panel. Only the CEO role can invoke this.
- `/setup_reporting_panels` — Posts both panels to their configured channels in one go. Only the CEO role can invoke this.

Each panel posts a button that opens the corresponding report modal for authorized roles. Submitted reports are routed to the review channels with decision buttons and DM notifications to authors after review.
