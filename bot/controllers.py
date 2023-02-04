from random import randint
from web_site.backend.models import Code, db, User, CodeTypes
from datetime import datetime
from web_site.backend import app


with app.app_context():
    TelegramCode = Code.get_telegram_codes()
    ResetCode = Code.get_reset_codes()


class ActivationController:

    @staticmethod
    def generate_telegram_code():
        code = randint(100000, 999999)

        with app.app_context():
            if TelegramCode.filter_by(code_value=code).first():
                return ActivationController.generate_telegram_code()

        return code

    @staticmethod
    def save_code(code, user):
        cd = Code(
            code_type=CodeTypes.telegram,
            code_value=code,
            telegram=user,
            created=datetime.now())

        with app.app_context():
            prev_code = TelegramCode.filter_by(telegram=user).first()
            if prev_code:
                db.session.delete(prev_code)

            db.session.add(cd)
            db.session.commit()


class ResetPasswordController:
    @staticmethod
    def generate_code():
        code = hex(randint(10000, 99999))

        if ResetPasswordController.is_code_exist(code):
            return ResetPasswordController.generate_code()
        return code

    @staticmethod
    def is_user_exist(telegram_id: int) -> bool:
        with app.app_context():
            if User.query.filter(User.telegram_id == telegram_id).first():
                return True
        return False

    @staticmethod
    def is_code_exist(code: str) -> bool:
        with app.app_context():
            if ResetCode.filter_by(code_value=code).first():
                return True
        return False

    @staticmethod
    def save_code(code: str):
        code = Code(code_value=code, created=datetime.now(), code_type=CodeTypes.reset)

        with app.app_context():
            db.session.add(code)
            db.session.commit()

    @staticmethod
    def remove_old_code(telegram_id):
        with app.app_context():
            code = ResetCode.filter_by(telegram=telegram_id).first()
            if code:
                db.session.delete(code)
                db.session.commit()

