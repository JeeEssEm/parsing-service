from .bot import BOT
from .views import *
from .scheduler import Schedule


def main():
    Schedule.start_process()
    BOT.polling()
