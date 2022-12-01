from flask import request
from flask_restx import Api, Resource, fields
from .models import User, Url, ExpiredToken
from . import db
from .config import Config
import jwt
from functools import wraps
from datetime import datetime, timedelta
from sqlalchemy import or_


def token_required(f):

    @wraps(f)
    def decorator(*args, **kwargs):

        token = None

        if "authorization" in request.headers:
            token = request.headers["authorization"]

        if not token:
            return {
                "success": False,
                "message": "Отсутствует токен"
            }, 400

        try:
            data = jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
            current_user = User.query.filter(User.email == data["email"]).first()

            if not current_user:
                return {"success": False,
                        "message": "Такого пользователя не существует"}, 400

            token_expired = ExpiredToken.query.filter(ExpiredToken.token == token).first()

            if token_expired is not None:
                return {"success": False, "message": "Такого токена больше не существует"}, 400

            if not current_user.token_active:
                return {"success": False, "message": "Токен устарел"}, 400

        except Exception as exc:
            print(exc)
            return {"success": False, "msg": "Неверный токен"}, 400

        return f(current_user, *args, **kwargs)

    return decorator


rest = Api(version='1.0', title='API')
urls = rest.namespace('urls')
auth = rest.namespace('auth')

""" models """

signup_model = auth.model(
    'SignUpModel', {
        "name": fields.String(required=True, min_length=2, max_length=32),
        "telegram_id": fields.Integer(),
        "email": fields.String(required=True, min_length=4, max_length=64),
        "password": fields.String(required=True, min_length=8, max_length=32)
    }
)

login_model = auth.model(
    'LoginModel', {
        "email": fields.String(required=True, min_length=5),
        "password": fields.String(required=True)
    }
)

""" auth routes"""


@auth.route('/api/users/register')
class Register(Resource):
    """Регистрация пользователя"""

    @auth.expect(signup_model, validate=True)
    def post(self):
        data = request.get_json()

        name = data.get("name")
        email = data.get("email")
        telegram_id = data.get("telegram_id")
        password = data.get("password")

        # проверка на существование пользователя
        user_exist = User.query.filter(or_(
            User.name == name,
            User.telegram_id == telegram_id,
            User.email == email
        )).first()

        if user_exist:
            return {
                       "success": False,
                       "message": "User already exists"
                   }, 400

        try:  # попытка добавить пользователя
            user = User(
                name=name,
                telegram_id=telegram_id,
                email=email
            )
            user.set_password(password)

            db.session.add(user)
            db.session.commit()

            success = True
            msg = "User registered successfully"
            code = 200

        except Exception as exc:
            print(exc)

            success = True
            msg = "Failed to register user"
            code = 400

        return {
                   "success": success,
                   "message": msg
               }, code


@auth.route("/api/users/login")
class Login(Resource):
    """ логин пользователя """

    @auth.expect(login_model, validate=True)
    def post(self):
        data = request.get_json()

        email = data['email']
        password = data['password']

        user = User.query.filter(User.email == email).first()

        if not user:
            return {
                "success": False,
                "message": "Такого поользователя не существует",
            }, 400

        if not user.check_password(password):
            return {
                "success": False,
                "message": "Неверный пароль"
            }, 400

        token = jwt.encode({
            "email": email,
            "expires": str(datetime.utcnow() + timedelta(days=30))
        }, Config.SECRET_KEY)

        user.set_token_active(True)
        db.session.add(user)
        db.session.commit()

        return {
            "success": True,
            "token": token,
        }, 200


@auth.route('/api/users/logout')
class Logout(Resource):

    @token_required
    def post(self, user):  # на самом деле в self попадает сама orm модель юзера, а в user уже селф
        token = request.headers["authorization"]

        exp_token = ExpiredToken(token=token, created=datetime.now())
        self.set_token_active(False)

        db.session.add(exp_token)
        db.session.add(self)
        db.session.commit()

        return {
            "success": True,
            "message": "Вы вышли из аккаунта"
        }, 200


""" data routes """

# @urls.route('/api/urls/url')
# class Url(Resource):
#
#
#     def get(self, current_user):
