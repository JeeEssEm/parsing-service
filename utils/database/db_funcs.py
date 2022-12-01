import sqlite3
from os import path

BASE_DIR = path.dirname(path.abspath(__file__))
DB_PATH = path.join(BASE_DIR, "../../web_site/app.db")

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

    return data


def get_user_by_name_or_telegram_id(name, tg_id):
    data = CURSOR.execute(f'''SELECT name, telegram_id, password from users
    WHERE name = "{name}" OR telegram_id = {tg_id}''').fetchone()
    return data


def create_new_user(name, tg_id, password):
    try:
        CURSOR.execute(f'''INSERT INTO users (name, telegram_id, password)
         VALUES("{name}", "{tg_id}", "{password}")''')
        CONNECTION.commit()
        return "success"
    except Exception as ex:
        return ex


if __name__ == '__main__':
    # data_ = get_users()
    # for r in data_:
    #     print(r)
    # print(get_user_by_name())
    print(create_new_user("user", 32, "password"))
