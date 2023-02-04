# Сервис для уведомления
Это проект, который включает в себя: сайт(Flask + React), бот(telegram) и парсер(selenium). 
Он нужен для того, чтобы отслеживать информацию на интересующих пользователя сайтах.
# Принцип работы
#### 1. Пользователь заходит на клиент, добавляет сайт для парсинга: 
Указывает название, описание, url, xpath, тип поля(число/строка) и условие сравнения
#### 2. Информация проверяется и добавляется в БД
#### 3. Парсер с некоторым промежутком времени пробегает по всем сайтам пользователя и, в случае истинности условия пользователя, отправляет ему уведомление

# Быстрый старт
#### 1. Установка python библиотек
```pip install -r requirements```
#### 2. Иницализация БД
> **Примечание:** при инициализации может произойти ошибка.
> Для её решения потребуется закомментировать строки импорта, содержащие "web_site" в файле **web_site/backend/routes/api.py**:
> ```python
> from web_site.backend.models import User, Url as UrlModel, RefreshToken, Code
> from web_site.backend import db
> from web_site.backend.config import Config
> from web_site.backend.parser.utils import cast_string_to_comparer, cast_string_to_type, cast_comparer_to_string, \
>   cast_type_to_string
> from web_site.backend.utils.token_service import TokenService
> from web_site.backend.parser.parser_engine.parser import parse_by_xpath
> ```
> После инициализации эти строки нужно раскоментировать

```
cd web_site/backend
flask db init
flask db migrate
flask db upgrade
```

#### 3. Установка [chromedriver](https://sites.google.com/chromium.org/driver/), подходящий под вашу версию браузера
После скачивания, chromedriver.exe необходимо поместить в папку **web_site/backend/parser/parser_engine**
Чтобы стало вот так:
>   parser_engine/  
>   |      ├── parser.py  
>   |      └── chromedriver.exe
#### 4. Добавление токена бота телеграм
Получить токен можно [тут](https://parsemachine.com/articles/gde-najti-token-bota-telegram-api/#:~:text=%D0%A1%D0%BF%D0%B5%D1%80%D0%B2%D0%B0%20%D0%BD%D0%B0%D0%BC%20%D0%BD%D0%B5%D0%BE%D0%B1%D1%85%D0%BE%D0%B4%D0%B8%D0%BC%D0%BE%20%D0%BE%D1%82%D0%BA%D1%80%D1%8B%D1%82%D1%8C%20%D0%B4%D0%B8%D0%B0%D0%BB%D0%BE%D0%B3,%D0%9E%D1%82%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D1%8F%D0%B5%D0%BC%20%D0%B5%D0%B3%D0%BE.)  
Его нужно добавить в окружение **bot/.env**:
> 5650047359:AAH1NXR3cyexUYhE6UG5ff-NPGXzAKZ2vu8
#### 5. Установка js модулей при помощи [npm](https://docs.npmjs.com/about-npm)
```
cd web_site/frontend
npm install
```

#### 6. Запуск клиента
```npm run start```
#### 7. Запуск сервера
Запустите **web_site/main.py** любым возможным способом

# Использование
#### 1. Команды бота
> ```/reset_password``` ─ позволяет сбросить пароль на сайте

> ```/activate``` ─ позволяет привязать телеграм аккаунт к аккаунту пользователя сайта
#### 2. Сайт
Имеется: юзер гайд по добыче xpath, пользовательское соглашение и система авторизации (основана на JWT токенах)

#### Запуск
К клиенту можно подключиться через браузер ```http://127.0.0.1:3000/```
К серверу можно подключиться через браузер ```http://127.0.0.1:5000/```
> **Примечание:** при смене IP, нужно поменять адреса клиента и сервера не только в **web_site/backend/config.py**:
> ```python
> class Config:
>     API_SERVER = "http://127.0.0.1:5000/"
>     CLIENT = "http://127.0.0.1:3000/"
> ```
> но и в **web_site/frontend/src/http/index.js**:
> ```javascript
> export const API_URL = "http://127.0.0.1:5000/"
> ```

# Структура
    parsing-service/
    ├───── bot
    |      ├── .env
    |      ├── __init__.py
    |      ├── bot.py
    |      ├── controllers.py
    |      ├── scheduler.py
    |      └── views.py
    |
    ├───── web_site
    |      ├── backend
    |      |   ├── __init__.py
    |      |   ├── app.py
    |      |   ├── config.py
    |      |   ├── models.py
    |      |   └── parser
    |      |       ├── parser_engine                        
    |      |       ├── enums.py                        
    |      |       └── utils.py                        
    |      |   ├── routes
    |      |   └── utils
    |      |
    |      ├── frontend
    |      |   ├── public
    |      |   ├── src
    |      |   |   ├── components
    |      |   |   ├── elements
    |      |   |   ├── pages
    |      |   |   ├── services
    |      |   |   ├── static
    |      |   |   ├── store
    |      |   |   ├── App.jsx
    |      |   |   └── index.js
    |      |   └── package.json
    |      |   
    |      └── main.py
    
#### config.py:
```python
class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db') + '?check_same_thread=False'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_REFRESH_KEY = "e59fabcdd6d11ab62c5932bada5897fb0e1af01113f6ee1eb41bf769f5bf4264"
    JWT_ACCESS_KEY = "7ddd765fe9bdc41c154060f957450111773a8bbc717a425b30eed85e6e44b050"

    API_SERVER = "http://127.0.0.1:5000/"
    CLIENT = "http://127.0.0.1:3000/"
```
JWT_REFRESH_KEY ─ ключ генерации refresh токена   
JWT_ACCESS_KEY ─ ключ генерации access токена  

#### comparers и types:
Типы:
* Строка, условия сранвния:
  + равенство
  + любое изменение данных
  + появление определённой строки на странице
* Число, условия сравнения:
  + увеличение значения
  + уменшение значения
> Более подробно о типах и значениях можно посмотреть в **web_site/backend/parser/enums.py**
