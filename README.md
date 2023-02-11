![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Selenium](https://img.shields.io/badge/-selenium-%43B02A?style=for-the-badge&logo=selenium&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)
![JWT](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![REACT-ROUTER](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![MUI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

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
```
cd backend
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
> TOKEN=5650047359:AAH1NXR3cyexUYhE6UG5ff-NPGXzAKZ2vu8
#### 5. Установка js модулей при помощи [npm](https://docs.npmjs.com/about-npm)
```
cd frontend
npm install
```

#### 6. Запуск клиента
```npm run start```
#### 7. Запуск сервера
Запустите **main.py** любым возможным способом

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
> но и в **frontend/src/http/index.js**:
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
    ├───── backend
    |      ├── __init__.py
    |      ├── app.py
    |      ├── config.py
    |      ├── models.py
    |      ├── parser
    |      |   ├── parser_engine                        
    |      |   ├── enums.py                        
    |      |   └── utils.py                        
    |      ├── routes
    |      |   ├── __init__.py
    |      |   ├── api_models.py
    |      |   ├── namespaces.py
    |      |   ├── user_routes.py
    |      |   ├── urls_routes.py
    |      |   ├── auth_routes.py
    |      |   └── token_validation.py
    |      └── utils
    |
    ├───── frontend
    |      ├── public
    |      ├── src
    |      |   ├── components
    |      |   ├── elements
    |      |   ├── pages
    |      |   ├── services
    |      |   ├── static
    |      |   ├── store
    |      |   ├── App.jsx
    |      |   └── index.js
    |      └── package.json
    |   
    └───── main.py
    
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
