# from selenium import webdriver
from selenium.webdriver.common.by import By
# from selenium_stealth import stealth
import undetected_chromedriver as uc
from os import path
import time

BASEDIR = path.abspath(path.dirname(__file__))
DRIVER = uc.Chrome()
# OPTIONS = webdriver.ChromeOptions()
# OPTIONS.add_argument("start-maximized")
# # OPTIONS.add_argument("--headless")
#
# OPTIONS.add_experimental_option("excludeSwitches", ["enable-automation"])
# OPTIONS.add_experimental_option('useAutomationExtension', False)
# DRIVER = webdriver.Chrome(options=OPTIONS, executable_path=path.join(BASEDIR, "chromedriver.exe"))
#
# stealth(DRIVER,
#         languages=["en-US", "en"],
#         vendor="Google Inc.",
#         platform="Win32",
#         webgl_vendor="Intel Inc.",
#         renderer="Intel Iris OpenGL Engine",
#         fix_hairline=True,
#         )


def parse_by_xpath(url, xpath):
    xpath = xpath.replace("/text()", "")

    try:  # проверка на корректный url
        DRIVER.get(url)
    except Exception as exc:
        return False, Exception(f'Некорректный url: {url}')
    time.sleep(2)
    if 'market.yandex.ru' in url:
        try:
            box = DRIVER.find_element(By.XPATH, '//*[@id="root"]/div/div/form/div[2]/div/div/div[1]/input')
            box.click()
            time.sleep(2)
        except Exception as exc:
            print(exc, '42 bot check')

    try:  # проверка на корректный xpath
        return True, DRIVER.find_element(By.XPATH, xpath).text
    except Exception as exc:
        return False, Exception(f'Некорректный xpath: {xpath}, url: {url}')


def parse_text(url):
    return parse_by_xpath(url, '/html/body')


def sign_in(url, login, password):
    ...


# DRIVER.quit()


if __name__ == '__main__':
    # print(parse_text('https://www.geeksforgeeks.org/convert-base-decimal-vice-versa/'))
    print(parse_by_xpath("https://market.yandex.ru/product--smartfon-google-pixel-6a/1753730814?cpa=1",
                         '//*[@id="cardAddButton"]/div[1]/div/div/div/div/div[2]/div[1]/div/div/span/span[1]'))

    DRIVER.quit()

