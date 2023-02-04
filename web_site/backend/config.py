import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.urandom(24).hex()
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db') + '?check_same_thread=False'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_REFRESH_KEY = "e59fabcdd6d11ab62c5932bada5897fb0e1af01113f6ee1eb41bf769f5bf4264"
    JWT_ACCESS_KEY = "7ddd765fe9bdc41c154060f957450111773a8bbc717a425b30eed85e6e44b050"
    TELEGRAM_GENERATOR_KEY = "d3775e5d525a0bf9"

    API_SERVER = "http://127.0.0.1:5000/"
    CLIENT = "http://127.0.0.1:3000/"

