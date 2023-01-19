import jwt
from datetime import datetime, timedelta
from web_site.backend.config import Config
from web_site.backend.models import RefreshToken, db


class TokenService:
    @staticmethod
    def generate_tokens(email):
        access_token = jwt.encode(
            {
                'email': email,
                'exp': datetime.now() + timedelta(minutes=30)
            },
            Config.JWT_ACCESS_KEY
        )

        refresh_token = jwt.encode(
            {
                'email': email,
                'exp': datetime.now() + timedelta(days=30)
            },
            Config.JWT_REFRESH_KEY
        )
        return access_token, refresh_token

    @staticmethod
    def save_refresh_token(refresh_token, user_id):
        refresh_token_model = RefreshToken(
            user_id=user_id,
            token_value=refresh_token
        )

        db.session.add(refresh_token_model)
        db.session.commit()
