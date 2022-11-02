from time import sleep
import schedule
from threading import Thread
from bot.bot import BOT


def send():
    BOT.send_message(869822696, "123")


def schedule_checker():
    while True:
        schedule.run_pending()
        sleep(1)

"""def schedule_task(task, seconds):
    schedule.every(seconds).seconds.do(task)
    while True:
        schedule.run_pending()
        sleep(1)


def run_schedule(schedule_):
    Process(target=schedule_, args=()).start()


run_schedule(schedule_task(send, 3))
"""

if __name__ == "__main__":
    schedule.every(1).seconds.do(send)
    Thread(target=schedule_checker).start()

    BOT.polling()




