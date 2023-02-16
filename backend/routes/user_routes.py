from flask_restx import Resource
from .namespaces import telegram_auth, user_route
from .token_validation import token_required
from flask import request
from backend.models import Code, db, User
from datetime import datetime


@telegram_auth.route('/api/activate')
class TelegramAuth(Resource):

    @token_required()
    def post(self, user):
        data = request.get_json()
        code = data.get('telegram_code')

        code_model = Code.get_telegram_codes().filter_by(
            code_value=code
        ).first()

        if not code_model:
            return {
                       'success': False,
                       'message': 'Вы ввели неверный код'
                   }, 400

        if (datetime.now() - code_model.created).seconds > 120:
            db.session.delete(code_model)
            db.session.commit()

            return {
                       'success': False,
                       'message': 'Код недействителен'
                   }, 400

        user.telegram_id = code_model.telegram

        db.session.add(user)
        db.session.delete(code_model)

        db.session.commit()

        return {
                   'success': True,
                   'message': 'Аккаунт успешно активирован'
               }, 200


@user_route.route('/api/change')
class UserRoute(Resource):

    @token_required(refresh=True)
    def post(self, user):
        data = request.get_json()

        name = data.get('name')
        user.name = name

        db.session.add(user)
        db.session.commit()

        return {
                   'success': True,
                   'message': 'Информация об аккаунте успешно изменена',
                   'user': {
                       'name': user.name,
                   }
               }, 200


@user_route.route('/api/password')
class UserPassword(Resource):

    def post(self):
        data = request.get_json()

        new_password = data.get('newPassword')
        reset_code = data.get('resetCode')

        reset_codes = Code.get_reset_codes()
        code_model = reset_codes.filter_by(code_value=reset_code).first()

        if not code_model:
            return {
                'success': False,
                'message': 'Такого кода сброса не существует'
            }, 400

        user = User.query.filter(
            User.telegram_id == code_model.telegram).first()
        user.set_password(new_password)

        db.session.add(user)
        db.session.commit()

        return {
            'success': True,
            'message': 'Пароль успешно обновлён'
        }, 200
