import telebot
import os


with open(os.path.join(os.path.dirname(__file__), '.env')) as f:
    TOKEN = f.read()

BOT = telebot.TeleBot(TOKEN)

