import telebot
from dotenv import load_dotenv
import os

load_dotenv()

TOKEN = os.environ.get('TOKEN', default='EMPTY')

BOT = telebot.TeleBot(TOKEN)
