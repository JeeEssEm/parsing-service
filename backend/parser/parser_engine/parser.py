from selenium.webdriver.common.by import By
import undetected_chromedriver as uc
from os import path
import time

BASEDIR = path.abspath(path.dirname(__file__))
DRIVER = uc.Chrome()


def parse_by_xpath(url, xpath):
    xpath = xpath.replace("/text()", "")

    try:  # проверка на корректный url
        DRIVER.get(url)
    except Exception as exc:
        return False, Exception(f'Некорректный url: {url}')
    time.sleep(2)

    try:  # проверка на корректный xpath
        return True, DRIVER.find_element(By.XPATH, xpath).text
    except Exception as exc:
        print(exc)
        return False, Exception(f'Некорректный xpath: {xpath}, url: {url}')


def parse_text(url):
    return parse_by_xpath(url, '/html/body')


def sign_in(url, login, password):
    ...


# DRIVER.quit()


if __name__ == '__main__':
    # print(parse_text('https://www.geeksforgeeks.org/convert-base-decimal-vice-versa/'))
    # print(parse_by_xpath("https://market.yandex.ru/product--smartfon-google-pixel-6a/1753730814?cpa=1",
    #                      '//*[@id="cardAddButton"]/div[1]/div/div/div/div/div[2]/div[1]/div/div/span/span[1]'))
    url_ = 'https://e-katalog.com.ru/' \
          'cellphones/XIAOMI-REDMI-NOTE-10-PRO-128GB-8GB'
    xpath_ = '/html/body/section/div/div[2]/div[2]/div/div[1]/div[2]/div/div[2]/div/div[1]/text()[1]'
    rs = parse_by_xpath(url_, xpath_)
    print(rs)
    DRIVER.quit()

