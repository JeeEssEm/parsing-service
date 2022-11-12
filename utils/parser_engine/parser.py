from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium_stealth import stealth

import time

OPTIONS = webdriver.ChromeOptions()
OPTIONS.add_argument("start-maximized")

OPTIONS.add_experimental_option("excludeSwitches", ["enable-automation"])
OPTIONS.add_experimental_option('useAutomationExtension', False)
DRIVER = webdriver.Chrome(options=OPTIONS, executable_path=r"chromedriver.exe")

stealth(DRIVER,
        languages=["en-US", "en"],
        vendor="Google Inc.",
        platform="Win32",
        webgl_vendor="Intel Inc.",
        renderer="Intel Iris OpenGL Engine",
        fix_hairline=True,
        )


def sign_in(url, login, password):
    ...


def parse_by_xpath(url, path):
    path = path.replace("/text()", "")

    try:  # проверка на корректный url
        DRIVER.get(url)
    except Exception as exc:
        return exc
    time.sleep(1)

    try:  # проверка на корректный xpath
        return DRIVER.find_element(By.XPATH, path).text
    except Exception as exc:
        return exc


# DRIVER.quit()


