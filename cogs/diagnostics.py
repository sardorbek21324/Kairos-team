from __future__ import annotations

import logging
from typing import Iterable

import discord
from discord import app_commands
from discord.ext import commands

import config

log = logging.getLogger(__name__)


class DiagnosticsCog(commands.Cog):
    """Provide a quick self-service diagnostics report for users."""

    def __init__(self, bot: commands.Bot):
        self.bot = bot

    @app_commands.command(
        name="diagnostics",
        description="Проверить доступы к ролям и каналам для работы с ботом",
    )
    async def diagnostics(self, interaction: discord.Interaction) -> None:
        member = interaction.user
        if not isinstance(member, discord.Member):
            await interaction.response.send_message(
                "Эту команду можно использовать только внутри сервера.", ephemeral=True
            )
            return

        await interaction.response.defer(ephemeral=True, thinking=True)

        role_checks: Iterable[tuple[str, int]] = (
            ("Оператор", config.OPERATOR_ROLE_ID),
            ("Монтажёр", config.EDITOR_ROLE_ID),
            ("CEO", config.CEO_ROLE_ID),
        )

        role_lines: list[str] = ["**Роли**"]
        for label, role_id in role_checks:
            guild_role = member.guild.get_role(role_id)
            has_role = member.get_role(role_id) is not None
            role_repr = guild_role.mention if guild_role else f"роль {role_id}"
            icon = "✅" if has_role else "❌"
            role_lines.append(f"{icon} {label}: {role_repr}")

        channel_checks: Iterable[tuple[str, int]] = (
            ("Канал отчётов по съёмке", config.SHOOTING_REPORT_CHANNEL_ID),
            ("Канал отчётов по монтажу", config.EDITING_REPORT_CHANNEL_ID),
        )

        channel_lines: list[str] = ["**Каналы отчётности**"]
        for label, channel_id in channel_checks:
            line = await self._describe_channel_access(member, label, channel_id)
            channel_lines.append(line)

        message_lines = ["\n".join(role_lines), "\n".join(channel_lines)]
        await interaction.followup.send("\n\n".join(message_lines), ephemeral=True)

    async def _describe_channel_access(
        self, member: discord.Member, label: str, channel_id: int
    ) -> str:
        channel = self.bot.get_channel(channel_id)
        if channel is None:
            try:
                channel = await self.bot.fetch_channel(channel_id)
            except discord.DiscordException:
                log.exception("Failed to fetch channel %s for diagnostics", channel_id)
                return f"❌ {label}: не удалось получить канал (ID: {channel_id})."

        if not isinstance(channel, discord.TextChannel):
            return f"❌ {label}: указанный канал (ID: {channel_id}) не является текстовым."

        perms = channel.permissions_for(member)
        has_view = perms.view_channel
        has_send = perms.send_messages
        if has_view and has_send:
            return f"✅ {label}: {channel.mention} доступен, можно отправлять сообщения."

        reasons: list[str] = []
        if not has_view:
            reasons.append("нет права просмотра")
        if not has_send:
            reasons.append("нет права отправки сообщений")
        reasons_text = ", ".join(reasons) if reasons else "недостаточно прав"
        return f"❌ {label}: {channel.mention if has_view else channel_id} — {reasons_text}."


def setup(bot: commands.Bot) -> None:
    bot.add_cog(DiagnosticsCog(bot))
