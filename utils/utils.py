import database.db_funcs as db
from enums import *
from dataclasses import dataclass
import parser_engine.parser as ps


@dataclass
class User:  # класс для хранения пользователя
    url: str
    telegram_id: int
    xpath: str
    comparer: int

    type: int = 1  # int или str
    previous_data: str = None
    login: str = None
    password: str = None


def get_data():  # получение всех данных с сайтов
    users = db.get_users()
    for telegram_id, url, xpath, comparer, type_, prev_data, login, password in users:
        user = User(
            telegram_id=telegram_id, url=url,
            xpath=xpath, comparer=comparer,
            type=type_, previous_data=prev_data,
            login=login, password=password
        )

        if user.login and user.password:
            ps.sign_in(user.url, user.login, user.password)

        element = ps.parse_by_xpath(user.url, user.xpath)
        # element = "test text"

        if user.type == Types.Numeric:  # кастуем, если нужно
            element = cast_to_numeric(element)

        yield user, element


def cast_to_numeric(num: str):  # кастуем к числу
    num = num.lower().strip().replace(" ", "").replace(",", ".")
    res = ""

    for s in num:
        if s.isdigit() or s == '.':
            res += s

    return float(res) if res else ValueError


def compare_data(data, previous_data, comparer):  # функция, которая сравнивает значения
    if type(data) is Exception:
        return data

    if comparer == Comparer.EQUALITY.value:
        return data == previous_data

    elif comparer == Comparer.COMPARISON_UP.value:
        return data > previous_data

    elif comparer == Comparer.COMPARISON_DOWN.value:
        return data < previous_data

    elif comparer == Comparer.CHANGE.value:
        return data != previous_data

    elif comparer == Comparer.CUSTOM.value:
        ...  # когда-нибудь допилю


def get_info_to_send():  # получение информации для отправки пользователю
    for user, info in get_data():
        if compare_data(info, user.previous_data, user.comparer):
            yield user, info


if __name__ == "__main__":
    dt = get_info_to_send()
    for rw in dt:
        print(rw)


