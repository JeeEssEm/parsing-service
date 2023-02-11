from .namespaces import auth, urls
from flask_restx import fields

signup_model = auth.model(
    'SignUpModel', {
        "name": fields.String(required=True, min_length=2, max_length=32),
        "password": fields.String(required=True, min_length=8)
    }
)

login_model = auth.model(
    'LoginModel', {
        "name": fields.String(required=True, min_length=2),
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
        'appearedValue': fields.String()
    }
)

get_url_model = urls.model(
    'GetUrlModel', {
        'url_id': fields.Integer(required=True)
    }
)
