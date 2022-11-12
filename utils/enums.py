from enum import Enum


class Comparer(Enum):  # способы сравнения
    EQUALITY = 0  # уведомлять, если значение равно заданному
    COMPARISON_DOWN = 1  # уведомлять, если значение уменьшилос
    COMPARISON_UP = 2  # уведомлять, если значение увеличилось
    CUSTOM = 3  # пользователь сам указывает как ему сравнивать данные
    CHANGE = 4  # любое изменение даных


class Types(Enum):  # Типы данных на сайте
    Numeric = 0
    String = 1
