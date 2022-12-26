# import database.db_funcs as db
from .enums import *
# from dataclasses import dataclass
# from web_site.backend.models import Url
# import parser_engine.parser as ps
from .parser_engine import parser as ps
from web_site.backend.models import Url, db


VALUES = {
        "EQUALITY": Comparer.EQUALITY.value,
        "COMPARISON_DOWN": Comparer.COMPARISON_DOWN.value,
        "COMPARISON_UP": Comparer.COMPARISON_UP.value,
        "CUSTOM": Comparer.CUSTOM.value,
        "CHANGE": Comparer.CHANGE.value,
    }


"""@dataclass
class User:  # класс для хранения пользователя
    url: str
    telegram_id: int
    xpath: str
    comparer: int

    type: int = 1  # int или str
    previous_data: str = None
    login: str = None
    password: str = None
"""


def get_data(urls):  # получение всех данных с сайтов
    for url in urls:
        # if user.login and user.password:  # TODO
        #     ps.sign_in(user.url, user.login, user.password)

        if url.comparer == Comparer.APPEARED.value:
            status, element = ps.parse_text(url.url)
        else:
            status, element = ps.parse_by_xpath(url.url, url.xpath)

        if not status:
            yield url, element

        if status and url.type == Types.Numeric:  # кастуем, если нужно
            element = cast_to_numeric(element)

        yield url, element


def cast_to_numeric(num: str):  # кастуем к числу
    num = num.lower().strip().replace(" ", "").replace(",", ".")
    res = ""

    for s in num:
        if s.isdigit() or s == '.':
            res += s

    return float(res) if res else ValueError


def compare_data(data, previous_data, comparer, expected_value=None):  # функция, которая сравнивает значения
    if type(data) is Exception:
        return data

    prev_now = f"\nпредыдущее: *{previous_data}*\nтекущее: *{data}*"
    empty_ret = (False, "")

    actions = {
        Comparer.EQUALITY.value: lambda x:
        (True, f"Текущее значение **равно** заданному:{prev_now}", data)
        if x == expected_value else empty_ret,

        Comparer.COMPARISON_UP.value: lambda x:
        (True, f"Текущее значение **меньше** заданного:{prev_now}", data)
        if x > previous_data else empty_ret,

        Comparer.COMPARISON_DOWN.value: lambda x:
        (True, f"Текущее значение **больше** заданного:{prev_now}", data)
        if x < previous_data else empty_ret,

        Comparer.CHANGE.value: lambda x:
        (True, f"Текущее значение **изменилось**:{prev_now}", data)
        if x != previous_data else empty_ret,

        Comparer.CUSTOM.value: lambda x: "" if x else empty_ret,

        Comparer.APPEARED.value: lambda x:
        (True, f"Текущее/заданное значение **содержится** в заданном/текущем:{prev_now}", data)
        if expected_value in data or data in expected_value else empty_ret
    }

    return actions[comparer](data)


def get_info_to_send(urls):  # получение информации для отправки пользователю
    res = []
    for url, info in get_data(urls):
        comp_res = compare_data(info, url.prev_data, url.comparer, url.expected_value)

        if type(info) is Exception:
            res.append(
                {
                    "telegram_id": url.owner.telegram_id,
                    "message": str(info)
                 })

        elif comp_res[0]:
            url.prev_data = comp_res[2]
            db.session.add(url)
            db.session.commit()

            res.append({
                "telegram_id": url.owner.telegram_id,
                "message": comp_res[1]
            })

    return res


def cast_string_to_type(string):
    if string == 'Numeric':
        return Types.Numeric.value

    return Types.String.value


def cast_string_to_comparer(string):
    return VALUES[string]


def cast_comparer_to_string(num):
    return list(VALUES.keys())[list(VALUES.values()).index(num)]


def cast_type_to_string(num):
    return 'Numeric' if num == Types.Numeric.value else 'String'


if __name__ == "__main__":
    # dt = get_info_to_send()

    for rw in get_info_to_send([
        Url(url="https://www.geeksforgeeks.org/how-to-use-close-and-quit-method-in-selenium-python/",
            xpath='//*[@id="read-tab"]/a',
            comparer=0,
            expected_value='Read'
            )
    ]):
        print(rw[1])
