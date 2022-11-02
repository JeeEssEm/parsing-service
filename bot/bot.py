import telebot

TOKEN = "5650047359:AAHsM7kg-LrtTQ_Nfw2THKT6I51wfeMZQrA"
BOT = telebot.TeleBot(TOKEN)


@BOT.message_handler(content_types=['text'])
def start(msg):
    BOT.send_message(msg.from_user.id, """
    Вас приветствует бот - уведомлялка, который отправляет сообщения, если на сайте что-то изменилось.
Вы можете настроить бота на сайте: ...""")






