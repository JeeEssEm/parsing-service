from bot import BOT
from controllers import ActivationController
from web_site.backend.config import Config
import jwt


@BOT.message_handler(commands=['start'])
def start(msg):
    BOT.send_message(msg.from_user.id, """
    Вас приветствует бот - уведомлялка, который отправляет сообщения, если на сайте что-то изменилось.
Вы можете настроить бота на сайте: ...""")


@BOT.message_handler(commands=['activate'])
def activate_telegram(msg):
    if len(msg.text.split()) == 1:
        BOT.send_message(msg.from_user.id,
                         """Отправьте мне код в сообщении. Пример: /activate ah123jhbjlkreusdhfjh23""")
        return

    user_code = msg.text.split()[1]

    for user, values in ActivationController.stack.items():
        if values[1] == user_code:
            try:
                jwt.decode(user_code, Config.TELEGRAM_GENERATOR_KEY)
                values[0] = True
            except jwt.ExpiredSignatureError:
                values[2] = True

            return

