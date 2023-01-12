from random import randint
from web_site.backend.models import TelegramCode, db
from datetime import datetime
from web_site.backend import app


class ActivationController:

    @staticmethod
    def generate_telegram_code():
        code = randint(10000000, 99999999)

        with app.app_context():
            if TelegramCode.query.filter(TelegramCode.code == code).first():
                print(code)
                return ActivationController.generate_telegram_code()

        return code

    @staticmethod
    def save_code(code, user):
        cd = TelegramCode(
            code=code,
            telegram=user,
            created=datetime.now())

        with app.app_context():
            prev_code = TelegramCode.query.filter(TelegramCode.telegram == user).first()
            if prev_code:
                db.session.delete(prev_code)

            db.session.add(cd)
            db.session.commit()


