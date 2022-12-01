from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    telegram_id = db.Column(db.Integer, unique=True)
    name = db.Column(db.String(32), unique=True)
    email = db.Column(db.String(64), unique=True)
    password = db.Column(db.String(128))

    url = db.relationship("Url", backref="owner")

    def set_password(self, pwd):
        self.password = generate_password_hash(pwd)

    def check_password(self, pwd):
        return check_password_hash(self.password, pwd)

    def __repr__(self):
        return f"<User> {self.name} {self.telegram_id}"


class Url(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, unique=True)
    xpath = db.Column(db.String)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    title = db.Column(db.String)
    description = db.Column(db.Text)
    auth_id = db.Column(db.Integer, db.ForeignKey('auth.id'), default=None)
    type = db.Column(db.Integer, nullable=False)
    prev_data = db.Column(db.Text)
    comparer = db.Column(db.Integer, nullable=False)

    auth = db.relationship("Auth")

    def __repr__(self):
        return f"<Url> {self.url} {self.xpath} {self.title}"


class Auth(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String)
    password = db.Column(db.String)
    url_id = db.Column(db.Integer, default=None)

    def __repr__(self):
        return f"<Auth> {self.login} {self.password}"


