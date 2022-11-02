import sqlite3


class DataBaseCRUD:
    CONNECTION = sqlite3.connect("app.db")
    CURSOR = CONNECTION.cursor()

    @staticmethod
    def get_users():
        ...

    @staticmethod
    def get_users_and_urls():
        ...



