import schedule
from time import sleep
from multiprocessing import Process
from backend.models import Url
from backend.parser.utils import get_info_to_send
from .views import send_info_message
from backend import app


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


def send_schedule_message():
    with app.app_context():
        for result in get_info_to_send(Url.query.all()):
            send_info_message(result['telegram_id'], result['message'])


schedule.every(20).seconds.do(send_schedule_message)
# schedule.every(2).seconds.do(send_schedule_message)
if __name__ == '__main__':
    send_schedule_message()
