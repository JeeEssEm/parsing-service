import telebot
import os


with open(os.path.join(os.path.dirname(__file__), '.env')) as f:
    TOKEN = f.read()

BOT = telebot.TeleBot(TOKEN)


@BOT.message_handler(content_types=['text'])
def start(msg):
    BOT.send_message(msg.from_user.id, """
    Вас приветствует бот - уведомлялка, который отправляет сообщения, если на сайте что-то изменилось.
Вы можете настроить бота на сайте: ...""")






