from flask import request, make_response
from flask_restx import Api, Resource, fields, reqparse
from .models import User, Url as UrlModel, ExpiredToken, RefreshToken
from . import db
from .config import Config
from .utils.utils import cast_string_to_comparer, cast_string_to_type, cast_comparer_to_string, cast_type_to_string, \
    get_info_to_send, generate_tokens
from .utils.parser_engine.parser import parse_by_xpath
import jwt
from functools import wraps
from datetime import datetime, timedelta
from sqlalchemy import or_


def token_required(refresh=False):
    def token_func(f):
        @wraps(f)
        def decorator(self, *args, **kwargs):

            token = None

            # if "authorization" in request.headers:
            if not refresh:
                token = request.headers['Authorization']
                decrypt = Config.JWT_ACCESS_TOKEN
            else:
                token = request.cookies.get("refresh_token")
                decrypt = Config.JWT_REFRESH_TOKEN

            if not token:
                return {
                           "success": False,
                           "message": "Отсутствует токен"
                       }, 400

            try:
                if token == 'bot':
                    current_user = 'bot'

                else:
                    data = jwt.decode(token, decrypt, algorithms=["HS256"], verify=True)
                    current_user = User.query.filter(User.email == data["email"]).first()

                    if not current_user:
                        return {"success": False,
                                "message": "Такого пользователя не существует"}, 400

                    # token_expired = ExpiredToken.query.filter(ExpiredToken.token == token).first()

                    # if token_expired is not None:
                    #     return {"success": False, "message": "Такого токена больше не существует"}, 400

                    # if not current_user.token_active:
                    #     return {"success": False, "message": "Токен устарел"}, 400

            except Exception as exc:
                print(exc)
                return {"success": False, "msg": "Неверный токен"}, 400

            return f(self, current_user, *args, **kwargs)

        return decorator
    return token_func


rest = Api(version='1.0', title='API')
urls = rest.namespace('urls')
auth = rest.namespace('auth')

get_url_parser = reqparse.RequestParser()
get_url_parser.add_argument('url_id', type=int)

""" json модели """

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

url_model = urls.model(
    'UrlModel', {
        'xpath': fields.String(required=True),
        'title': fields.String(required=True, min_length=1),
        'description': fields.String(),
        'url': fields.String(required=True, min_length=5),
        'type': fields.String(required=True),
        'comparer': fields.String(required=True),
    }
)

get_url_model = urls.model(
    'GetUrlModel', {
        'url_id': fields.Integer(required=True)
    }
)

""" auth routes"""


@auth.route('/api/users/register')
class Register(Resource):
    """Регистрация пользователя"""

    @auth.expect(signup_model, validate=True)
    def post(self):
        data = request.get_json()
        print(data)
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
            # ТОКЕНЫ
            access_token, refresh_token = generate_tokens(email)

            refresh_token_model = RefreshToken(
                user_id=user.id,
                token_value=refresh_token
            )

            db.session.add(refresh_token_model)
            db.session.commit()

            # Конец токенов

            success = True
            msg = "User registered successfully"
            response = make_response(
                {
                    "success": success,
                    "message": msg,
                    "user": {
                        "email": email,
                        "name": name,
                    },
                    "refresh_token": refresh_token,
                    "access_token": access_token
                }
            )
            response.set_cookie(
                'refresh_token', refresh_token,
                httponly=True, max_age=timedelta(days=30)
            )
            return response

        except Exception as exc:
            print(exc)

            msg = "Failed to register user"

        return {
                   "success": False,
                   "message": msg
               }, 400


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

        # token = jwt.encode({
        #     "email": email,
        #     "expires": str(datetime.utcnow() + timedelta(days=30))
        # }, Config.SECRET_KEY)

        # ТОКЕНЫ
        access_token, refresh_token = generate_tokens(email)

        refresh_token_model = RefreshToken(
            user_id=user.id,
            token_value=refresh_token
        )

        db.session.add(refresh_token_model)
        db.session.commit()
        # КОНЕЦ ТОКЕНОВ

        response = make_response(
            {
                "success": True,
                "refresh_token": refresh_token,
                "access_token": access_token,
                "user": {
                    "email": user.email,
                    "name": user.name
                }
            }, 200
        )

        response.set_cookie(
            'refresh_token', refresh_token,
            httponly=True, max_age=timedelta(days=30)
        )

        user.set_token_active(True)
        db.session.add(user)
        db.session.commit()

        return response


@auth.route('/api/users/logout')
class Logout(Resource):

    @token_required(refresh=True)
    def post(self, user):
        print(user, self)
        refresh_token = request.cookies.get('refresh_token')
        RefreshToken.query.filter(RefreshToken.token_value == refresh_token).delete()
        db.session.commit()

        response = make_response()
        response.delete_cookie('refresh_token')
        return {
                   "success": True,
                   "message": "Вы вышли из аккаунта"
               }, 200


@auth.route('/api/users/refresh')
class Refresh(Resource):

    @token_required(refresh=True)
    def get(self, user):
        refresh_token = request.cookies.get('refresh_token')
        token_model = RefreshToken.query.filter(RefreshToken.token_value == refresh_token).first()

        new_access_token, new_refresh_token = generate_tokens(token_model.owner.email)

        token_model.token_value = new_refresh_token
        db.session.add(token_model)
        db.session.commit()

        response = make_response({
            "success": True,
            "access_token": new_access_token,
            "refresh_token": new_refresh_token,
            "user": {
                "email": user.email,
                "name": user.name
            }
        })

        response.set_cookie(
            'refresh_token', new_refresh_token,
            httponly=True, max_age=timedelta(days=30)
        )
        return response


""" data routes """


@urls.route('/api/urls')
class Urls(Resource):

    @token_required()
    def get(self, user):
        # user = User.query.filter(User.id == 1).first()  # затычка

        if user == 'bot':
            info = get_info_to_send(UrlModel.query.all())

            return {
                       'values': info
                   }, 200

        res = user.urls

        return {
                   'success': True,
                   'urls': [link.get_short_dict() for link in res]
               }, 200


@urls.route('/api/url')
class Url(Resource):

    @token_required()
    @urls.expect(get_url_parser)
    def get(self, user):
        url_id = int(request.args.getlist('url_id')[0])
        url = user.urls.filter(UrlModel.id == url_id).first()

        if url:
            url = url.get_dict()
            url['comparer'] = cast_comparer_to_string(url['comparer'])
            url['type'] = cast_type_to_string(url['type'])
            return {
                'success': True,
                'url': url
            }, 200

        return {
            'success': False,
            'message': 'Url не найден'
        }, 400

    @token_required()
    @urls.expect(url_model, validate=True)
    def post(self, user):
        data = request.get_json()

        xpath = data.get('xpath')
        title = data.get('title')
        desc = data.get('description')
        url = data.get('url')

        tp = cast_string_to_type(data.get('type'))
        comp = cast_string_to_comparer(data.get('comparer'))

        # user = User.query.filter(User.id == 1).first()  # затычка

        status, prev_data = parse_by_xpath(url, xpath)
        print(prev_data)
        if not status:
            return {
                       'success': False,
                       'message': str(prev_data)
                   }, 400

        url = UrlModel(
            owner_id=user.id, xpath=xpath, title=title, description=desc, url=url, type=tp, comparer=comp,
            prev_data=prev_data
        )

        db.session.add(url)
        db.session.commit()

        return {
                   'success': True
               }, 200

