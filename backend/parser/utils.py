from backend.models import db
from backend.parser.enums import *
from backend.parser.parser_engine import parser as ps

VALUES = {
        "EQUALITY": Comparer.EQUALITY.value,
        "COMPARISON_DOWN": Comparer.COMPARISON_DOWN.value,
        "COMPARISON_UP": Comparer.COMPARISON_UP.value,
        "CUSTOM": Comparer.CUSTOM.value,
        "CHANGE": Comparer.CHANGE.value,
        "APPEARED": Comparer.APPEARED.value
    }


def get_data(urls):  # получение всех данных с сайтов
    for url in urls:

        if url.comparer == Comparer.APPEARED.value:
            status, element = ps.parse_text(url.url)
        else:
            status, element = ps.parse_by_xpath(url.url, url.xpath)

        if not status:
            yield url, element

        if status and url.type == Types.Numeric.value:  # кастуем, если нужно
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

    prev_now = f"\n—Предыдущее: *{previous_data}*\n—Текущее: *{data}*"
    empty_ret = (False, "")

    actions = {
        Comparer.EQUALITY.value: lambda x:
        (True, f"—Текущее значение *равно* заданному:{prev_now}", data)
        if x == expected_value and expected_value != previous_data else empty_ret,

        Comparer.COMPARISON_UP.value: lambda x:
        (True, f"—Текущее значение *меньше* заданного:{prev_now}", data)
        if x > cast_to_numeric(previous_data) else empty_ret,

        Comparer.COMPARISON_DOWN.value: lambda x:
        (True, f"—Текущее значение *больше* заданного:{prev_now}", data)
        if x < cast_to_numeric(previous_data) else empty_ret,

        Comparer.CHANGE.value: lambda x:
        (True, f"—Текущее значение *изменилось*:{prev_now}", data)
        if x != previous_data else empty_ret,

        Comparer.CUSTOM.value: lambda x: "" if x else empty_ret,

        Comparer.APPEARED.value: lambda x:
        (True, f"—Текущее/заданное значение *содержится* в заданном/текущем:{prev_now}", data)
        if expected_value in data or data in expected_value else empty_ret
    }

    return actions[comparer](data)


def get_info_to_send(urls):  # получение информации для отправки пользователю

    for url, info in get_data(urls):
        comp_res = compare_data(
            info, url.prev_data, url.comparer,
            cast_to_numeric(url.expected_value)
            if url.type == Types.Numeric.value
            else url.expected_value
        )

        if type(info) is Exception:
            yield {
                    "telegram_id": url.owner.telegram_id,
                    "message": str(info)
                 }

        elif comp_res[0]:
            url.prev_data = comp_res[2]
            db.session.add(url)
            db.session.commit()

            yield {
                "telegram_id": url.owner.telegram_id,
                "message": comp_res[1] + f"\n{url.url}",
            }


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
