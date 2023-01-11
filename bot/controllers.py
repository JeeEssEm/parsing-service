import jwt
from web_site.backend.config import Config
from datetime import datetime, timedelta
from time import sleep


class ActivationController:
    stack = {}

    @staticmethod
    def generate_telegram_code(email):
        code = jwt.encode(
            {
                'email': email,
                'exp': datetime.now() + timedelta(minutes=2)
            },
            Config.TELEGRAM_GENERATOR_KEY
        )

        return code

    async def get_activation_status(self, user) -> bool:  # expired/activated
        start = 0

        while start < 120:
            sleep(1)
            if self.stack[user][0]:
                return True  # activated
            if self.stack[user][2]:
                return False  # expired
            start += 1

        return False  # expired

