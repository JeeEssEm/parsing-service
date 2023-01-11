from time import sleep
import schedule
from threading import Thread
from bot.bot import BOT


def schedule_handler():
    BOT.send_message(869822696, "123")


def schedule_checker():
    while True:
        schedule.run_pending()
        sleep(1)


if __name__ == "__main__":
    schedule.every(30).minutes.do(schedule_handler)
    Thread(target=schedule_checker).start()

    BOT.polling()
