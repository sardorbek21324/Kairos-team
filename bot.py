from __future__ import annotations

import asyncio
import logging

import discord
from discord.ext import commands

import config
from cogs.shooting import ShootingReportsCog, ShootingPanelView, ShootingDecisionView
from cogs.editing import EditingReportsCog, EditingPanelView, EditingDecisionView
from cogs.setup_panels import PanelSetupCog
from cogs.diagnostics import DiagnosticsCog

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)


def create_bot() -> commands.Bot:
    intents = discord.Intents.default()
    intents.guilds = True
    intents.members = True

    bot = commands.Bot(command_prefix="!", intents=intents)

    @bot.event
    async def setup_hook() -> None:
        # Register persistent views
        bot.add_view(ShootingPanelView())
        bot.add_view(ShootingDecisionView())
        bot.add_view(EditingPanelView())
        bot.add_view(EditingDecisionView())

        await bot.add_cog(ShootingReportsCog(bot))
        await bot.add_cog(EditingReportsCog(bot))
        await bot.add_cog(PanelSetupCog(bot))
        await bot.add_cog(DiagnosticsCog(bot))

        try:
            if config.COMMAND_GUILD_IDS:
                for guild_id in config.COMMAND_GUILD_IDS:
                    guild = discord.Object(id=guild_id)
                    await bot.tree.sync(guild=guild)
                    log.info("Synced commands for guild %s", guild_id)
            else:
                await bot.tree.sync()
                log.info("Globally synced commands")
        except Exception:
            log.exception("Failed to sync application commands")

    return bot


async def main() -> None:
    bot = create_bot()
    token = config.token
    if not token:
        raise RuntimeError("DISCORD_TOKEN is not set. Please configure it in environment or config.py")
    async with bot:
        await bot.start(token)


if __name__ == "__main__":
    asyncio.run(main())
