from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from enum import IntEnum


class CodeTypes(IntEnum):
    telegram = 0
    reset = 1


db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    telegram_id = db.Column(db.Integer, unique=True)
    name = db.Column(db.String(32), unique=True)
    # email = db.Column(db.String(64), unique=True)
    password = db.Column(db.String(128))
    token_active = db.Column(db.Boolean, default=False, nullable=False)

    urls = db.relationship("Url", back_populates="owner", lazy="dynamic")

    def get_dict(self):
        return {
            c.name: getattr(self, c.name) for c in self.__table__.columns
        }

    def set_password(self, pwd):
        self.password = generate_password_hash(pwd)

    def check_password(self, pwd):
        return check_password_hash(self.password, pwd)

    def set_token_active(self, status):
        self.token_active = status

    def __repr__(self):
        return f"<User> {self.name} {self.telegram_id} {self.urls}"


class Url(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, unique=True)
    xpath = db.Column(db.String)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    title = db.Column(db.String)
    description = db.Column(db.Text)
    auth_id = db.Column(db.Integer, db.ForeignKey('auth.id'), default=None, nullable=True)
    type = db.Column(db.Integer, nullable=False)
    prev_data = db.Column(db.Text)
    comparer = db.Column(db.Integer, nullable=False)
    expected_value = db.Column(db.Text, nullable=True)

    owner = db.relationship("User", back_populates="urls")
    auth = db.relationship("Auth", foreign_keys=[auth_id])

    def get_dict(self):
        # return {
        #     c.name: getattr(self, c.name) for c in self.__table__.columns
        # }
        return {
            "title": self.title,
            "description": self.description,
            "url": self.url,
            "xpath": self.xpath,
            "type": self.type,
            "prev_data": self.prev_data,
            "comparer": self.comparer,
            "expected_value": self.expected_value,
            "auth": {
                "login": self.auth.login if self.auth else None,
                "password": self.auth.password if self.auth else None
            },
            'id': self.id
        }

    def get_short_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "url": self.url
        }

    def __repr__(self):
        return f"<Url> {self.url} {self.xpath} {self.title} "


class Auth(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String)
    password = db.Column(db.String)
    url_id = db.Column(db.Integer, db.ForeignKey('url.id'), default=None)

    url = db.relationship('Url', foreign_keys=[url_id])

    def __repr__(self):
        return f"<Auth> {self.login} {self.password}"


class Code(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    code_value = db.Column(db.String, unique=True)
    code_type = db.Column(db.Integer)
    telegram = db.Column(db.Integer)
    created = db.Column(db.DateTime)

    def __repr__(self):
        return f"<Code> {self.code_value} {self.telegram} {self.created}"

    @staticmethod
    def get_telegram_codes():
        # return Code.query.filter(Code.code_type.type == 'Telegram')
        return Code.get_codes(CodeTypes.telegram)

    @staticmethod
    def get_reset_codes():
        # return Code.query.filter(Code.code_type == 'Reset')
        return Code.get_codes(CodeTypes.reset)

    @staticmethod
    def get_codes(tp):
        return Code.query.filter(Code.code_type == tp)


class RefreshToken(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    token_value = db.Column(db.String)

    owner = db.relationship("User")

