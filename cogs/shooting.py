from __future__ import annotations

import logging
from datetime import datetime
from typing import Optional

import discord
from discord import app_commands
from discord.ext import commands

import config
from cogs.editing import FinishMontageView

log = logging.getLogger(__name__)


# Helper permission checks

def has_any_role(member: discord.Member, role_ids: tuple[int, ...]) -> bool:
    return any(member.get_role(role_id) for role_id in role_ids)


def extract_author_id_from_embed(embed: discord.Embed) -> Optional[int]:
    if embed.footer and embed.footer.text:
        # Expecting footer like: "Автор отчёта: username (ID: 123456789)"
        text = embed.footer.text
        if "ID:" in text:
            try:
                return int(text.split("ID:")[-1].strip().strip(")"))
            except ValueError:
                return None
    return None


class ShootingPanelView(discord.ui.View):
    def __init__(self):
        # Persistent view so the button keeps working after restarts
        super().__init__(timeout=None)

    @discord.ui.button(
        label="Отправить отчёт по съёмке",
        style=discord.ButtonStyle.primary,
        custom_id="shooting_panel_submit",
    )
    async def open_modal(self, interaction: discord.Interaction, button: discord.ui.Button):
        try:
            member = interaction.user
            if not isinstance(member, discord.Member):
                await interaction.response.send_message(
                    "Не удалось получить данные пользователя.", ephemeral=True
                )
                return
            if not has_any_role(member, (config.OPERATOR_ROLE_ID, config.CEO_ROLE_ID)):
                await interaction.response.send_message(
                    "У вас нет прав для отправки этого отчёта.", ephemeral=True
                )
                return
            await interaction.response.send_modal(ShootingReportModal(author=member))
        except Exception:
            log.exception("Failed to open shooting report modal")
            if interaction.response.is_done():
                await interaction.followup.send(
                    "Не удалось открыть форму отчёта. Попробуйте ещё раз.",
                    ephemeral=True,
                )
            else:
                await interaction.response.send_message(
                    "Не удалось открыть форму отчёта. Попробуйте ещё раз.",
                    ephemeral=True,
                )


class ShootingReportModal(discord.ui.Modal, title="Отправка отчёта по съёмке"):
    def __init__(self, author: discord.Member):
        super().__init__(timeout=None)
        self.author = author

        self.date_field = discord.ui.TextInput(
            label="Когда была съёмка?",
            placeholder="YYYY-MM-DD",
            required=True,
            custom_id="shooting_date",
        )
        self.location_field = discord.ui.TextInput(
            label="Где была съёмка?",
            required=True,
            custom_id="shooting_location",
        )
        self.count_field = discord.ui.TextInput(
            label="Сколько видео сняли?",
            required=True,
            custom_id="shooting_count",
        )
        self.drive_field = discord.ui.TextInput(
            label="Ссылка на материалы (Google Диск)",
            required=True,
            custom_id="shooting_drive_link",
        )
        self.examples_field = discord.ui.TextInput(
            label="Ссылка на пример ролика(ов)",
            required=True,
            custom_id="shooting_examples",
            style=discord.TextStyle.long,
        )
        for item in (
            self.date_field,
            self.location_field,
            self.count_field,
            self.drive_field,
            self.examples_field,
        ):
            self.add_item(item)

    async def on_submit(self, interaction: discord.Interaction) -> None:
        try:
            # Validate date
            try:
                datetime.strptime(self.date_field.value.strip(), "%Y-%m-%d")
            except ValueError:
                await interaction.response.send_message(
                    "Дата должна быть в формате YYYY-MM-DD.", ephemeral=True
                )
                return

            # Validate count
            try:
                count = int(self.count_field.value.strip())
                if count <= 0:
                    raise ValueError
            except ValueError:
                await interaction.response.send_message(
                    "Количество видео должно быть положительным целым числом.",
                    ephemeral=True,
                )
                return

            drive_link = self.drive_field.value.strip()
            if not drive_link.startswith(("http://", "https://")):
                await interaction.response.send_message(
                    "Ссылка на Google-файл должна начинаться с http:// или https://.",
                    ephemeral=True,
                )
                return

            embed = discord.Embed(
                title="Отчёт по съёмке",
                color=discord.Color.teal(),
                timestamp=discord.utils.utcnow(),
            )
            embed.add_field(name="Дата съёмки", value=self.date_field.value, inline=False)
            embed.add_field(name="Локация", value=self.location_field.value, inline=False)
            embed.add_field(
                name="Количество видео", value=str(count), inline=False
            )
            embed.add_field(name="Google-диск", value=drive_link, inline=False)
            embed.add_field(name="Примеры роликов", value=self.examples_field.value, inline=False)
            embed.set_footer(
                text=f"Автор отчёта: {interaction.user} (ID: {interaction.user.id})"
            )

            review_channel = interaction.client.get_channel(
                config.SHOOTING_REVIEW_CHANNEL_ID
            )
            if not isinstance(review_channel, discord.TextChannel):
                await interaction.response.send_message(
                    "Канал для проверки не найден. Обратитесь к администратору.",
                    ephemeral=True,
                )
                return

            view = ShootingDecisionView()
            content = f"<@&{config.EDITOR_ROLE_ID}> <@&{config.CEO_ROLE_ID}>"

            await review_channel.send(content=content, embed=embed, view=view)
            await interaction.response.send_message(
                "✅ Ваш отчёт по съёмке отправлен на проверку.", ephemeral=True
            )
        except Exception:
            log.exception("Error while submitting shooting report")
            if interaction.response.is_done():
                await interaction.followup.send(
                    "Произошла ошибка. Попробуйте ещё раз или обратитесь к администратору.",
                    ephemeral=True,
                )
            else:
                await interaction.response.send_message(
                    "Произошла ошибка. Попробуйте ещё раз или обратитесь к администратору.",
                    ephemeral=True,
                )


class ShootingDecisionModal(discord.ui.Modal):
    def __init__(self, status: str, require_comment: bool, reviewer: discord.Member):
        title_map = {
            "accepted": "Комментарий к принятию отчёта",
            "mixed": "Комментарий к статусу 50/50",
            "rejected": "Комментарий к отклонению отчёта",
        }
        super().__init__(title=title_map.get(status, "Комментарий"), timeout=None)
        self.status = status
        self.reviewer = reviewer
        self.comment_field = discord.ui.TextInput(
            label="Комментарий",
            required=require_comment,
            style=discord.TextStyle.long,
        )
        self.add_item(self.comment_field)

    async def on_submit(self, interaction: discord.Interaction) -> None:
        try:
            if not interaction.message or not interaction.message.embeds:
                await interaction.response.send_message(
                    "Исходное сообщение не найдено.", ephemeral=True
                )
                return

            original_embed = interaction.message.embeds[0]
            embed = discord.Embed.from_dict(original_embed.to_dict())

            status_label = {
                "accepted": "ПРИНЯТ",
                "mixed": "50/50",
                "rejected": "ОТКЛОНЁН",
            }[self.status]
            status_color = {
                "accepted": discord.Color.green(),
                "mixed": discord.Color.orange(),
                "rejected": discord.Color.dark_red(),
            }[self.status]
            title_prefix = {
                "accepted": "✅",
                "mixed": "➗",
                "rejected": "❌",
            }[self.status]

            embed.title = f"{title_prefix} Отчёт по съёмке [{status_label}]"
            embed.color = status_color

            comment_value = self.comment_field.value or "нет комментария"
            status_value = (
                f"Решение: {status_label}\n"
                f"Ревьюер: {self.reviewer.mention}\n"
                f"Комментарий: {comment_value}"
            )

            # Remove existing status field if present
            embed_fields = [
                field for field in embed.fields if field.name != "Статус"
            ]
            embed.clear_fields()
            for field in embed_fields:
                embed.add_field(name=field.name, value=field.value, inline=field.inline)
            embed.add_field(name="Статус", value=status_value, inline=False)

            # Disable buttons
            view = ShootingDecisionView(disabled=True)

            await interaction.message.edit(embed=embed, view=view)
            await interaction.response.send_message(
                "Решение по отчёту сохранено.", ephemeral=True
            )

            # Notify author via DM
            author_id = extract_author_id_from_embed(embed)
            if author_id:
                user = interaction.client.get_user(author_id) or await interaction.client.fetch_user(author_id)
                if user:
                    try:
                        forward_note = (
                            " Видео передано в монтаж." if self.status in {"accepted", "mixed"} else ""
                        )
                        decision_timestamp = discord.utils.utcnow().strftime("%Y-%m-%d %H:%M UTC")

                        def get_field_value(name: str) -> str:
                            for field in embed.fields:
                                if field.name == name:
                                    return field.value
                            return "—"

                        report_timestamp = (
                            embed.timestamp.strftime("%Y-%m-%d %H:%M UTC")
                            if embed.timestamp
                            else "—"
                        )
                        shooting_date = get_field_value("Дата съёмки")
                        location = get_field_value("Локация")
                        video_count = get_field_value("Количество видео")
                        drive_link = get_field_value("Google-диск")
                        examples_link = get_field_value("Примеры роликов")

                        await user.send(
                            "Ваш отчёт по съёмке был обработан.\n"
                            f"📅 Отправлено: {report_timestamp}\n"
                            f"🕰 Решение вынесено: {decision_timestamp}\n"
                            "🎬 Тип отчёта: Съёмка\n"
                            f"🗓 Дата съёмки: {shooting_date}\n"
                            f"📍 Локация: {location}\n"
                            f"🎞 Количество видео: {video_count}\n"
                            f"📂 Google-диск: {drive_link}\n"
                            f"🎯 Примеры роликов: {examples_link}\n"
                            f"⚖️ Статус: {status_label}.{forward_note}\n"
                            f"👤 Ревьюер: {self.reviewer} (ID: {self.reviewer.id})\n"
                            f"💬 Комментарий ревьюера: {comment_value}\n"
                            f"🔗 Ссылка на отчёт: {interaction.message.jump_url}"
                        )
                    except Exception:
                        log.warning("Не удалось отправить DM автору", exc_info=True)

            if self.status == "rejected":
                d1_channel = interaction.client.get_channel(config.HIGH_STAFF_CHANNEL_ID)
                if isinstance(d1_channel, discord.TextChannel):
                    error_embed = discord.Embed(
                        title="❌ Отклонённый отчёт по съёмке",
                        color=discord.Color.dark_red(),
                        timestamp=discord.utils.utcnow(),
                    )
                    for field in embed.fields:
                        if field.name == "Статус":
                            continue
                        error_embed.add_field(
                            name=field.name, value=field.value, inline=field.inline
                        )
                    error_embed.add_field(
                        name="Комментарий",
                        value=comment_value or "нет комментария",
                        inline=False,
                    )
                    error_embed.add_field(
                        name="Отклонил",
                        value=f"{self.reviewer} (ID: {self.reviewer.id})",
                        inline=False,
                    )
                    error_embed.add_field(
                        name="Ссылка на отчёт", value=interaction.message.jump_url, inline=False
                    )

                    content = f"<@&{config.PROJECT_MANAGER_ROLE_ID}> <@&{config.CEO_ROLE_ID}>"
                    await d1_channel.send(content=content, embed=error_embed)

            # Forward to editing if accepted or mixed
            if self.status in {"accepted", "mixed"}:
                editing_channel = interaction.client.get_channel(config.EDITING_REPORT_CHANNEL_ID)
                if not isinstance(editing_channel, discord.TextChannel):
                    log.error("Editing report channel not found when forwarding shooting report")
                    return

                editing_embed = discord.Embed.from_dict(embed.to_dict())
                existing_fields = [
                    field for field in editing_embed.fields if field.name != "Статус монтажа"
                ]
                editing_embed.clear_fields()
                for field in existing_fields:
                    editing_embed.add_field(
                        name=field.name, value=field.value, inline=field.inline
                    )
                editing_embed.add_field(
                    name="Статус монтажа", value="В монтаже", inline=False
                )

                view = FinishMontageView()
                content = f"<@&{config.EDITOR_ROLE_ID}>"
                await editing_channel.send(content=content, embed=editing_embed, view=view)
        except Exception:
            log.exception("Error while processing shooting decision")
            if interaction.response.is_done():
                await interaction.followup.send(
                    "Произошла ошибка. Попробуйте ещё раз или обратитесь к администратору.",
                    ephemeral=True,
                )
            else:
                await interaction.response.send_message(
                    "Произошла ошибка. Попробуйте ещё раз или обратитесь к администратору.",
                    ephemeral=True,
                )


class ShootingDecisionView(discord.ui.View):
    def __init__(self, *, timeout: Optional[float] = None, disabled: bool = False):
        super().__init__(timeout=timeout)
        self.accept_button.disabled = disabled
        self.mixed_button.disabled = disabled
        self.reject_button.disabled = disabled

    @discord.ui.button(
        label="Принять",
        style=discord.ButtonStyle.success,
        custom_id="shooting_decision_accept",
    )
    async def accept_button(self, interaction: discord.Interaction, button: discord.ui.Button):
        await self._handle_decision(interaction, status="accepted", require_comment=False)

    @discord.ui.button(
        label="50/50",
        style=discord.ButtonStyle.secondary,
        custom_id="shooting_decision_mixed",
    )
    async def mixed_button(self, interaction: discord.Interaction, button: discord.ui.Button):
        await self._handle_decision(interaction, status="mixed", require_comment=True)

    @discord.ui.button(
        label="Отклонить",
        style=discord.ButtonStyle.danger,
        custom_id="shooting_decision_reject",
    )
    async def reject_button(self, interaction: discord.Interaction, button: discord.ui.Button):
        await self._handle_decision(interaction, status="rejected", require_comment=True)

    async def _handle_decision(
        self,
        interaction: discord.Interaction,
        *,
        status: str,
        require_comment: bool,
    ) -> None:
        member = interaction.user
        if not isinstance(member, discord.Member):
            await interaction.response.send_message(
                "Не удалось получить данные пользователя.", ephemeral=True
            )
            return
        if not has_any_role(member, (config.EDITOR_ROLE_ID, config.CEO_ROLE_ID)):
            await interaction.response.send_message(
                "У вас нет прав для этого действия.", ephemeral=True
            )
            return
        await interaction.response.send_modal(
            ShootingDecisionModal(status=status, require_comment=require_comment, reviewer=member)
        )


class ShootingReportsCog(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot

    @app_commands.command(name="setup_shooting_panel", description="Создать панель отчётов по съёмке")
    async def setup_shooting_panel(self, interaction: discord.Interaction) -> None:
        member = interaction.user
        if not isinstance(member, discord.Member) or not member.get_role(config.CEO_ROLE_ID):
            await interaction.response.send_message(
                "Только CEO может использовать эту команду.", ephemeral=True
            )
            return

        embed = discord.Embed(
            title="Отчёты по съёмке",
            description="Панель для отчётов по съёмке. Нажмите кнопку ниже, чтобы отправить отчёт.",
            color=discord.Color.blurple(),
        )
        view = ShootingPanelView()
        await interaction.response.send_message(embed=embed, view=view)

    @setup_shooting_panel.error
    async def setup_error(self, interaction: discord.Interaction, error: app_commands.AppCommandError):
        log.exception("Error in setup_shooting_panel", exc_info=error)
        if interaction.response.is_done():
            await interaction.followup.send(
                "Произошла ошибка при создании панели.", ephemeral=True
            )
        else:
            await interaction.response.send_message(
                "Произошла ошибка при создании панели.", ephemeral=True
            )


def setup(bot: commands.Bot) -> None:
    bot.add_cog(ShootingReportsCog(bot))
