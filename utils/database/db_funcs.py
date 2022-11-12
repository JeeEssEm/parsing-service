import sqlite3
from os import path

BASE_DIR = path.dirname(path.abspath(__file__))
DB_PATH = path.join(BASE_DIR, "app.db")

CONNECTION = sqlite3.connect(DB_PATH, check_same_thread=False)
CURSOR = CONNECTION.cursor()


def get_users():
    data = CURSOR.execute("""SELECT users.telegram_id,
     urls.url, urls.xpath, urls.comparer, urls.type, urls.previous_data, 
     auth_data.login, auth_data.password
     FROM users
          
     LEFT JOIN urls
     ON
         users.id = urls.owner_id
         
     LEFT JOIN auth_data
     ON
         urls.auth_id = auth_data.id""")

    for row in data:
        yield row


if __name__ == '__main__':
    data_ = get_users()
    for r in data_:
        print(r)

