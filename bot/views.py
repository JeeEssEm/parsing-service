from bot import BOT
from .controllers import ActivationController, ResetPasswordController
from web_site.backend.config import Config


@BOT.message_handler(commands=['start'])
def start(msg):
    BOT.send_message(msg.from_user.id, """
    Вас приветствует бот - уведомлялка, который отправляет сообщения, если на сайте что-то изменилось.
Вы можете настроить бота на сайте: ...""")


@BOT.message_handler(commands=['activate'])
def activate_telegram(msg):
    code = ActivationController.generate_telegram_code()
    ActivationController.save_code(code, msg.from_user.id)

    BOT.send_message(msg.from_user.id,
                     f"""
        Ваш код активации:\n{'*' + str(code) + '*'}
Его нужно ввести на __сайте__""", parse_mode='MarkDown'
                     )


@BOT.message_handler(commands=['reset_password'])
def reset_password(msg):
    user_id = msg.from_user.id

    if not ResetPasswordController.is_user_exist(user_id):
        BOT.send_message(user_id, "Ваш аккаунт телеграм *не привязан*", parse_mode='MarkDown')
        return

    ResetPasswordController.remove_old_code(user_id)
    code = ResetPasswordController.generate_code()
    ResetPasswordController.save_code(code)

    url = Config.CLIENT + f'reset-password/{code}'

    BOT.send_message(user_id, f'Чтобы восстановить пароль от аккаунта, перейдите по <a href="{url}">ссылке</a>',
                     parse_mode='HTML')


def send_info_message(chat_id, text):
    BOT.send_message(chat_id, text, parse_mode='MarkDown')
