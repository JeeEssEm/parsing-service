from functools import wraps
from flask import request
from backend.config import Config
import jwt
from datetime import datetime, timedelta
from backend.models import User


def token_required(refresh=False):
    def token_func(f):
        @wraps(f)
        def decorator(self, *args, **kwargs):
            if not refresh:
                token = request.headers['Authorization']
                decrypt = Config.JWT_ACCESS_KEY
            else:
                token = request.cookies.get("refresh_token")
                decrypt = Config.JWT_REFRESH_KEY

            if not token:
                return {
                           "success": False,
                           "message": "Отсутствует токен"
                       }, 401

            try:

                data = jwt.decode(token, decrypt, algorithms=["HS256"],
                                  verify=True)
                elapsed_time = (datetime.now() - timedelta(seconds=data['exp'])
                                - datetime(1970, 1, 1)).total_seconds()

                if elapsed_time > 0:
                    print(elapsed_time)
                    return {
                               'success': False,
                               'message': 'Время действия токена истекло'
                           }, 401

                current_user = User.query.filter(
                    User.name == data["name"]
                ).first()

                if not current_user:
                    return {"success": False,
                            "message": "Такого пользователя не существует"}, 401

            except Exception as exc:
                print(exc, token)
                return {"success": False, "message": "Неверный токен"}, 401

            return f(self, current_user, *args, **kwargs)

        return decorator

    return token_func

