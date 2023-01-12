from bot import BOT
from .controllers import ActivationController


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
