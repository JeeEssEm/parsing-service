import schedule
from time import sleep
from multiprocessing import Process
# from .bot import BOT


class Schedule:
    @staticmethod
    def schedule_checker():
        while True:
            schedule.run_pending()
            sleep(1)

    @staticmethod
    def start_process():
        process_schedule = Process(target=Schedule.schedule_checker, args=())
        process_schedule.start()


# schedule.every(30).minutes.do()



