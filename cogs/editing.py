from __future__ import annotations

import logging
from typing import Optional

import discord
from discord import app_commands
from discord.ext import commands

import config

log = logging.getLogger(__name__)


def has_any_role(member: discord.Member, role_ids: tuple[int, ...]) -> bool:
    return any(member.get_role(role_id) for role_id in role_ids)


def extract_author_id_from_embed(embed: discord.Embed) -> Optional[int]:
    if embed.footer and embed.footer.text:
        text = embed.footer.text
        if "ID:" in text:
            try:
                return int(text.split("ID:")[-1].strip().strip(")"))
            except ValueError:
                return None
    return None


class EditingPanelView(discord.ui.View):
    def __init__(self, *, timeout: Optional[float] = None):
        super().__init__(timeout=timeout)

    @discord.ui.button(
        label="Отправить отчёт по монтажу",
        style=discord.ButtonStyle.primary,
        custom_id="editing_panel_submit",
    )
    async def open_modal(self, interaction: discord.Interaction, button: discord.ui.Button):
        member = interaction.user
        if not isinstance(member, discord.Member):
            await interaction.response.send_message(
                "Не удалось получить данные пользователя.", ephemeral=True
            )
            return
        if not has_any_role(member, (config.EDITOR_ROLE_ID, config.CEO_ROLE_ID)):
            await interaction.response.send_message(
                "У вас нет прав для отправки этого отчёта.", ephemeral=True
            )
            return
        await interaction.response.send_modal(EditingReportModal(author=member))


class FinishMontageView(discord.ui.View):
    def __init__(self):
        super().__init__(timeout=None)

    @discord.ui.button(
        label="Завершить монтаж",
        style=discord.ButtonStyle.primary,
        custom_id="finish_montage_button",
    )
    async def finish_montage_button(
        self, interaction: discord.Interaction, button: discord.ui.Button
    ):
        try:
            member = interaction.user
            if not isinstance(member, discord.Member):
                await interaction.response.send_message(
                    "Не удалось получить данные пользователя.", ephemeral=True
                )
                return

            if not member.get_role(config.EDITOR_ROLE_ID):
                await interaction.response.send_message(
                    "Только монтажёр может завершить монтаж.", ephemeral=True
                )
                return

            await interaction.response.send_modal(EditingReportModal(author=member))
        except Exception:
            log.exception("Failed to open editing report modal from finish button")
            if interaction.response.is_done():
                await interaction.followup.send(
                    "Не удалось открыть форму. Попробуйте ещё раз.", ephemeral=True
                )
            else:
                await interaction.response.send_message(
                    "Не удалось открыть форму. Попробуйте ещё раз.", ephemeral=True
                )


class EditingReportModal(discord.ui.Modal, title="Отправка отчёта по монтажу"):
    def __init__(self, author: discord.Member):
        super().__init__(timeout=None)
        self.author = author

        self.project_field = discord.ui.TextInput(
            label="Куда это видео?",
            required=True,
            custom_id="editing_project",
        )
        self.count_field = discord.ui.TextInput(
            label="Сколько готовых роликов смонтировано?",
            required=True,
            custom_id="editing_count",
        )
        self.drive_field = discord.ui.TextInput(
            label="Ссылка на ролик(и) в Google Диске",
            required=True,
            custom_id="editing_drive",
        )
        self.comment_field = discord.ui.TextInput(
            label="Комментарий",
            required=False,
            custom_id="editing_comment",
            style=discord.TextStyle.long,
        )

        for item in (
            self.project_field,
            self.count_field,
            self.drive_field,
            self.comment_field,
        ):
            self.add_item(item)

    async def on_submit(self, interaction: discord.Interaction) -> None:
        try:
            try:
                count = int(self.count_field.value.strip())
                if count <= 0:
                    raise ValueError
            except ValueError:
                await interaction.response.send_message(
                    "Количество роликов должно быть положительным целым числом.",
                    ephemeral=True,
                )
                return

            drive_link = self.drive_field.value.strip()
            if not drive_link.startswith(("http://", "https://")):
                await interaction.response.send_message(
                    "Ссылка на ролик должна начинаться с http:// или https://.",
                    ephemeral=True,
                )
                return

            embed = discord.Embed(
                title="Отчёт по монтажу",
                color=discord.Color.blue(),
                timestamp=discord.utils.utcnow(),
            )
            embed.add_field(
                name="Проект / компания", value=self.project_field.value, inline=False
            )
            embed.add_field(
                name="Количество роликов", value=str(count), inline=False
            )
            embed.add_field(name="Google-диск", value=drive_link, inline=False)
            if self.comment_field.value:
                embed.add_field(name="Комментарий", value=self.comment_field.value, inline=False)
            embed.set_footer(
                text=f"Автор отчёта: {interaction.user} (ID: {interaction.user.id})"
            )

            review_channel = interaction.client.get_channel(
                config.EDITING_REVIEW_CHANNEL_ID
            )
            if not isinstance(review_channel, discord.TextChannel):
                await interaction.response.send_message(
                    "Канал для проверки не найден. Обратитесь к администратору.",
                    ephemeral=True,
                )
                return

            view = EditingDecisionView()
            content = f"<@&{config.CEO_ROLE_ID}> <@&{config.PROJECT_MANAGER_ROLE_ID}>"

            await review_channel.send(content=content, embed=embed, view=view)
            await interaction.response.send_message(
                "✅ Ваш отчёт по монтажу отправлен на проверку.", ephemeral=True
            )
        except Exception:
            log.exception("Error while submitting editing report")
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


class EditingDecisionModal(discord.ui.Modal):
    def __init__(self, status: str, require_comment: bool, reviewer: discord.Member):
        title_map = {
            "accepted": "Комментарий к принятию отчёта по монтажу",
            "rejected": "Комментарий к отклонению отчёта по монтажу",
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
                "rejected": "ОТКЛОНЁН",
            }[self.status]
            status_color = {
                "accepted": discord.Color.green(),
                "rejected": discord.Color.dark_red(),
            }[self.status]
            title_prefix = {
                "accepted": "✅",
                "rejected": "❌",
            }[self.status]

            embed.title = f"{title_prefix} Отчёт по монтажу [{status_label}]"
            embed.color = status_color

            comment_value = self.comment_field.value or "нет комментария"
            status_value = (
                f"Решение: {status_label}\n"
                f"Ревьюер: {self.reviewer.mention}\n"
                f"Комментарий: {comment_value}"
            )

            embed_fields = [
                field for field in embed.fields if field.name != "Статус"
            ]
            embed.clear_fields()
            for field in embed_fields:
                embed.add_field(name=field.name, value=field.value, inline=field.inline)
            embed.add_field(name="Статус", value=status_value, inline=False)

            view = EditingDecisionView(disabled=True)

            await interaction.message.edit(embed=embed, view=view)
            await interaction.response.send_message(
                "Решение по отчёту сохранено.", ephemeral=True
            )

            author_id = extract_author_id_from_embed(embed)
            if author_id:
                user = interaction.client.get_user(author_id) or await interaction.client.fetch_user(author_id)
                if user:
                    try:
                        publish_note = (
                            " Ролики переданы в блок Публикации." if self.status == "accepted" else ""
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
                        project = get_field_value("Проект / компания")
                        video_count = get_field_value("Количество роликов")
                        drive_link = get_field_value("Google-диск")
                        author_comment = get_field_value("Комментарий")

                        await user.send(
                            "Ваш отчёт по монтажу был обработан.\n"
                            f"📅 Отправлено: {report_timestamp}\n"
                            f"🕰 Решение вынесено: {decision_timestamp}\n"
                            "🎞 Тип отчёта: Монтаж\n"
                            f"🏷 Проект / компания: {project}\n"
                            f"🔢 Количество роликов: {video_count}\n"
                            f"📂 Google-диск: {drive_link}\n"
                            f"📝 Комментарий автора: {author_comment}\n"
                            f"⚖️ Статус: {status_label}.{publish_note}\n"
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
                        title="❌ Отклонённый отчёт по монтажу",
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

            if self.status == "accepted":
                publish_channel = interaction.client.get_channel(config.PUBLISH_REPORT_CHANNEL_ID)
                if not isinstance(publish_channel, discord.TextChannel):
                    log.error("Publish report channel not found when forwarding editing report")
                    return

                publish_embed = discord.Embed.from_dict(embed.to_dict())
                view = PublishDecisionView()
                content = f"<@&{config.STAFF_ROLE_ID}>"
                await publish_channel.send(content=content, embed=publish_embed, view=view)
        except Exception:
            log.exception("Error while processing editing decision")
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


class EditingDecisionView(discord.ui.View):
    def __init__(self, *, timeout: Optional[float] = None, disabled: bool = False):
        super().__init__(timeout=timeout)
        self.accept_button.disabled = disabled
        self.reject_button.disabled = disabled

    @discord.ui.button(
        label="Принять",
        style=discord.ButtonStyle.success,
        custom_id="editing_decision_accept",
    )
    async def accept_button(self, interaction: discord.Interaction, button: discord.ui.Button):
        await self._handle_decision(interaction, status="accepted", require_comment=False)

    @discord.ui.button(
        label="Отклонить",
        style=discord.ButtonStyle.danger,
        custom_id="editing_decision_reject",
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
        if not has_any_role(
            member, (config.CEO_ROLE_ID, config.PROJECT_MANAGER_ROLE_ID)
        ):
            await interaction.response.send_message(
                "У вас нет прав для этого действия.", ephemeral=True
            )
            return
        await interaction.response.send_modal(
            EditingDecisionModal(status=status, require_comment=require_comment, reviewer=member)
        )


class PublishDecisionView(discord.ui.View):
    def __init__(self, *, timeout: Optional[float] = None, disabled: bool = False):
        super().__init__(timeout=timeout)
        self.publish_needed_button.disabled = disabled

    @discord.ui.button(
        label="Нужно опубликовать",
        style=discord.ButtonStyle.primary,
        custom_id="publish_needed_button",
    )
    async def publish_needed_button(
        self, interaction: discord.Interaction, button: discord.ui.Button
    ) -> None:
        try:
            member = interaction.user
            if not isinstance(member, discord.Member):
                await interaction.response.send_message(
                    "Не удалось получить данные пользователя.", ephemeral=True
                )
                return

            if not has_any_role(member, (config.STAFF_ROLE_ID, config.CEO_ROLE_ID)):
                await interaction.response.send_message(
                    "Отметить публикацию могут только Staff или CEO.",
                    ephemeral=True,
                )
                return

            if not interaction.message or not interaction.message.embeds:
                await interaction.response.send_message(
                    "Исходное сообщение не найдено.", ephemeral=True
                )
                return

            post_channel = interaction.client.get_channel(config.POST_DONE_CHANNEL_ID)
            if not isinstance(post_channel, discord.TextChannel):
                await interaction.response.send_message(
                    "Канал post-done не найден. Обратитесь к администратору.",
                    ephemeral=True,
                )
                return

            embed = discord.Embed.from_dict(interaction.message.embeds[0].to_dict())
            publish_title_prefix = "📢"
            publish_status_label = "ОПУБЛИКОВАНО"
            base_title = embed.title or "Отчёт"
            title_without_status = base_title.split("[", 1)[0].strip()
            embed.title = f"{publish_title_prefix} {title_without_status} [{publish_status_label}]"
            embed.color = discord.Color.gold()

            preserved_fields = [
                field for field in embed.fields if field.name != "Статус публикации"
            ]
            embed.clear_fields()
            for field in preserved_fields:
                embed.add_field(name=field.name, value=field.value, inline=field.inline)
            embed.add_field(
                name="Статус публикации", value="Опубликовано", inline=False
            )

            content = f"<@&{config.PROJECT_MANAGER_ROLE_ID}> <@&{config.CEO_ROLE_ID}>"
            await post_channel.send(content=content, embed=embed)

            disabled_view = PublishDecisionView(disabled=True)
            await interaction.message.edit(embed=embed, view=disabled_view)
            await interaction.response.send_message(
                "Отчёт отмечен как опубликованный и отправлен в канал post-done.",
                ephemeral=True,
            )
        except Exception:
            log.exception("Failed to mark publish needed")
            if interaction.response.is_done():
                await interaction.followup.send(
                    "Не удалось обновить статус публикации.", ephemeral=True
                )
            else:
                await interaction.response.send_message(
                    "Не удалось обновить статус публикации.", ephemeral=True
                )


class EditingReportsCog(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot

    @app_commands.command(name="setup_editing_panel", description="Создать панель отчётов по монтажу")
    async def setup_editing_panel(self, interaction: discord.Interaction) -> None:
        member = interaction.user
        if not isinstance(member, discord.Member) or not member.get_role(config.CEO_ROLE_ID):
            await interaction.response.send_message(
                "Только CEO может использовать эту команду.", ephemeral=True
            )
            return

        embed = discord.Embed(
            title="Отчёты по монтажу",
            description="Панель для отчётов по монтажу. Нажмите кнопку ниже, чтобы отправить отчёт.",
            color=discord.Color.blurple(),
        )
        view = EditingPanelView()
        await interaction.response.send_message(embed=embed, view=view)

    @setup_editing_panel.error
    async def setup_error(self, interaction: discord.Interaction, error: app_commands.AppCommandError):
        log.exception("Error in setup_editing_panel", exc_info=error)
        if interaction.response.is_done():
            await interaction.followup.send(
                "Произошла ошибка при создании панели.", ephemeral=True
            )
        else:
            await interaction.response.send_message(
                "Произошла ошибка при создании панели.", ephemeral=True
            )


def setup(bot: commands.Bot) -> None:
    bot.add_cog(EditingReportsCog(bot))
