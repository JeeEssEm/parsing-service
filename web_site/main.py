from backend import app
from bot import main
from threading import Thread


class FlaskThread(Thread):
    def run(self):
        app.run()


class TelegramThread(Thread):
    def run(self):
        main()


if __name__ == '__main__':
    flask_thread = FlaskThread()
    telegram_thread = TelegramThread()

    flask_thread.start()
    telegram_thread.start()


