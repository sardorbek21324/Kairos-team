from __future__ import annotations

import logging
from typing import Iterable, Optional

import discord
from discord import app_commands
from discord.ext import commands

import config
from cogs.editing import EditingPanelView
from cogs.shooting import ShootingPanelView

log = logging.getLogger(__name__)


class PanelSetupCog(commands.Cog):
    """Utility cog to deploy all reporting panels with a single command."""

    def __init__(self, bot: commands.Bot):
        self.bot = bot

    @app_commands.command(
        name="setup_reporting_panels",
        description="Создать панели отчётов по съёмке и монтажу в нужных каналах",
    )
    async def setup_reporting_panels(self, interaction: discord.Interaction) -> None:
        member = interaction.user
        if not isinstance(member, discord.Member) or not member.get_role(config.CEO_ROLE_ID):
            await interaction.response.send_message(
                "Только CEO может использовать эту команду.", ephemeral=True
            )
            return

        await interaction.response.defer(ephemeral=True, thinking=True)

        results: list[str] = []
        failures: list[str] = []

        shooting_embed = discord.Embed(
            title="Отчёты по съёмке",
            description="Панель для отчётов по съёмке. Нажмите кнопку ниже, чтобы отправить отчёт.",
            color=discord.Color.blurple(),
        )
        editing_embed = discord.Embed(
            title="Отчёты по монтажу",
            description="Панель для отчётов по монтажу. Нажмите кнопку ниже, чтобы отправить отчёт.",
            color=discord.Color.blurple(),
        )

        tasks: Iterable[tuple[int, discord.Embed, discord.ui.View, str]] = (
            (
                config.SHOOTING_REPORT_CHANNEL_ID,
                shooting_embed,
                ShootingPanelView(),
                "панель съёмки",
            ),
            (
                config.EDITING_REPORT_CHANNEL_ID,
                editing_embed,
                EditingPanelView(),
                "панель монтажа",
            ),
        )

        for channel_id, embed, view, label in tasks:
            outcome = await self._send_panel(channel_id, embed, view, label)
            if outcome:
                results.append(outcome)
            else:
                failures.append(label)

        message_lines: list[str] = []
        if results:
            message_lines.append("\n".join(results))
        if failures:
            message_lines.append(
                "\n".join(
                    f"❌ Не удалось отправить {label}. Проверьте ID канала." for label in failures
                )
            )

        if not message_lines:
            message_lines.append("Не удалось отправить панели. Проверьте настройки каналов.")

        await interaction.followup.send("\n".join(message_lines), ephemeral=True)

    async def _send_panel(
        self,
        channel_id: int,
        embed: discord.Embed,
        view: discord.ui.View,
        label: str,
    ) -> Optional[str]:
        channel = self.bot.get_channel(channel_id)
        if channel is None:
            try:
                fetched = await self.bot.fetch_channel(channel_id)
            except discord.DiscordException:
                log.exception("Failed to fetch channel %s for %s", channel_id, label)
                return None
            else:
                channel = fetched

        if not isinstance(channel, discord.TextChannel):
            log.error("Channel %s for %s is not a text channel", channel_id, label)
            return None

        try:
            await channel.send(embed=embed, view=view)
            return f"✅ Успешно отправлена {label} в {channel.mention}"
        except discord.DiscordException:
            log.exception("Failed to send %s to channel %s", label, channel_id)
            return None


def setup(bot: commands.Bot) -> None:
    bot.add_cog(PanelSetupCog(bot))
