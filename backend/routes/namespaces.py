from flask_restx import Api

rest = Api(version='1.0', title='API')
urls = rest.namespace('urls')
auth = rest.namespace('auth')
user_route = rest.namespace('user')
telegram_auth = rest.namespace('telegram')
