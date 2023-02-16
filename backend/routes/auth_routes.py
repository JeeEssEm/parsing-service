from flask_restx import Resource
from backend.models import db
from flask import request, make_response
from backend.utils.token_service import TokenService
from backend.models import User, RefreshToken
from datetime import timedelta

from backend.routes.api_models import signup_model, login_model
from backend.routes.namespaces import auth
from backend.routes.token_validation import token_required


@auth.route('/api/users/register')
class Register(Resource):
    """Регистрация пользователя"""

    @auth.expect(signup_model, validate=True)
    def post(self):
        data = request.get_json()

        name = data.get("name")
        telegram_id = data.get("telegram_id")
        password = data.get("password")
        # проверка на существование пользователя
        user_exist = User.query.filter(
            User.name == name
        ).first()

        if user_exist:
            return {
                       "success": False,
                       "message": "Пользователь уже существует"
                   }, 400

        try:  # попытка добавить пользователя
            user = User(
                name=name,
                telegram_id=telegram_id,
                # email=email
            )
            user.set_password(password)

            db.session.add(user)
            db.session.commit()
            # ТОКЕНЫ
            access_token, refresh_token = TokenService.generate_tokens(name)
            TokenService.save_refresh_token(refresh_token, user.id)
            # Конец токенов

            success = True
            msg = "User registered successfully"
            response = make_response(
                {
                    "success": success,
                    "message": msg,
                    "user": {
                        # "email": email,
                        "name": name,
                        "telegram": "Не привязан"
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

            msg = "Не удалось зарегистрировать пользователя"

        return {
                   "success": False,
                   "message": msg
               }, 400


@auth.route("/api/users/login")
class Login(Resource):
    """ Логин пользователя """

    @auth.expect(login_model, validate=True)
    def post(self):
        data = request.get_json()

        name = data['name']
        password = data['password']

        user = User.query.filter(User.name == name).first()

        if not user:
            return {
                       "success": False,
                       "message": "Такого пользователя не существует",
                   }, 400

        if not user.check_password(password):
            return {
                       "success": False,
                       "message": "Неверный пароль"
                   }, 400

        # ТОКЕНЫ
        access_token, refresh_token = TokenService.generate_tokens(name)
        TokenService.save_refresh_token(refresh_token, user.id)
        # КОНЕЦ ТОКЕНОВ

        response = make_response(
            {
                "success": True,
                "access_token": access_token,
                "user": {
                    "telegram": "Привязан" if user.telegram_id else
                    "Не привязан",
                    "name": user.name
                }
            }, 200
        )

        response.set_cookie(
            'refresh_token', refresh_token,
            httponly=True, max_age=timedelta(days=30)
        )

        db.session.add(user)
        db.session.commit()

        return response


@auth.route('/api/users/logout')
class Logout(Resource):

    @token_required(refresh=True)
    def post(self, user):
        refresh_token = request.cookies.get('refresh_token')
        RefreshToken.query.filter(
            RefreshToken.token_value == refresh_token
        ).delete()
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
        token_model = RefreshToken.query.filter(
            RefreshToken.token_value == refresh_token
        ).first()

        if not token_model:
            return {
                       "success": False,
                   }, 401

        new_access_token, new_refresh_token = TokenService.generate_tokens(
            token_model.owner.name
        )

        token_model.token_value = new_refresh_token
        db.session.add(token_model)
        db.session.commit()

        response = make_response({
            "success": True,
            "access_token": new_access_token,
            "user": {
                "telegram": "Привязан" if user.telegram_id else "Не привязан",
                "name": user.name
            }
        })

        response.set_cookie(
            'refresh_token', new_refresh_token,
            httponly=True, max_age=timedelta(days=30)
        )
        return response
