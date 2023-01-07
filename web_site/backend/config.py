import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.urandom(24).hex()
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_REFRESH_TOKEN = "e59fabcdd6d11ab62c5932bada5897fb0e1af01113f6ee1eb41bf769f5bf4264"
    JWT_ACCESS_TOKEN = "7ddd765fe9bdc41c154060f957450111773a8bbc717a425b30eed85e6e44b050"

