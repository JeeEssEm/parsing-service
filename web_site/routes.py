from flask import request
from flask_restx import Api, Resource, fields
from .models import User, Url
from . import db


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

""" auth routes"""


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
        user_exist = User.query.filter(User.name == name).first()
        if user_exist:
            return {
                "success": False,
                "message": "User already exists"
            }, 400

        try:  # попытка добавить пользователя
            user = User(
                name=name,
                telegram_id=telegram_id,
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


""" data routes """

# @urls.route('/api/urls/url')
# class Url(Resource):
#
#
#     def get(self, current_user):



