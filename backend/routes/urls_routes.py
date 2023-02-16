from flask import request
from flask_restx import Resource, reqparse
from backend.models import Url as UrlModel
from backend.models import db
from backend.parser.parser_engine.parser import parse_by_xpath, parse_text
from backend.parser.utils import (
    cast_string_to_comparer,
    cast_string_to_type,
    cast_comparer_to_string,
    cast_type_to_string,
)
from backend.routes.token_validation import token_required
from backend.routes.namespaces import urls
from backend.routes.api_models import url_model

get_url_parser = reqparse.RequestParser()
get_url_parser.add_argument('url_id', type=int)


@urls.route('/api/urls')
class Urls(Resource):
    @token_required()
    def get(self, user):
        # user = User.query.filter(User.id == 1).first()  # затычка

        # if user == 'bot':
        #     info = get_info_to_send(UrlModel.query.all())
        #
        #     return {
        #                'values': info
        #            }, 200

        res = user.urls

        return {
            'success': True,
            'urls': [link.get_short_dict() for link in res],
        }, 200


@urls.route('/api/url')
class Url(Resource):
    @token_required()
    @urls.expect(get_url_parser)
    def get(self, user):
        url_id = int(request.args.getlist('url_id')[0])
        url = user.urls.filter(UrlModel.id == url_id).first()

        if url:
            url = url.get_dict()
            url['comparer'] = cast_comparer_to_string(url['comparer'])
            url['type'] = cast_type_to_string(url['type'])
            return {'success': True, 'url': url, 'id': url['id']}, 200

        return {'success': False, 'message': 'Url не найден'}, 400

    @token_required()
    @urls.expect(url_model, validate=True)
    def post(self, user):
        data = request.get_json()

        xpath = data.get('xpath')
        title = data.get('title')
        desc = data.get('description')
        url = data.get('url')
        expected = data.get('appearedValue')

        tp = cast_string_to_type(data.get('type'))
        comp = cast_string_to_comparer(data.get('comparer'))

        edit = data.get('edit')

        # user = User.query.filter(User.id == 1).first()  # затычка
        # TODO: проверка на существующий url у разных пользователей
        url_db = user.urls.filter(UrlModel.url == url).first()

        if url_db and not edit:
            return {
                "success": False,
                "message": f"Название \"{title}\" или ссылка уже существует",
            }, 403

        if comp == 5:
            status, prev_data = parse_text(url)
        else:
            status, prev_data = parse_by_xpath(url, xpath)

        if not status:
            return {
                'success': False,
                'message': str(prev_data),
            }, 400

        if not url_db:
            url_db = UrlModel(
                owner_id=user.id,
                xpath=xpath,
                title=title,
                description=desc,
                url=url,
                type=tp,
                comparer=comp,
                prev_data=prev_data,
                expected_value=expected,
            )
        else:
            url_db.xpath = xpath
            url_db.title = title
            url_db.description = desc
            url_db.url = url
            url_db.comparer = comp
            url_db.expected_value = expected
            url_db.type = tp

        db.session.add(url_db)
        db.session.commit()

        return {
            'success': True,
            'message': f"Сайт \"{title}\" успешно добавлен",
            'url': url_db.get_short_dict(),
        }, 200


@urls.route('/api/url/remove')
class UrlOperation(Resource):
    @token_required()
    def post(self, user):
        data = request.get_json()
        url_id = data.get('url_id')

        url = user.urls.filter(UrlModel.id == url_id).first()

        db.session.delete(url)
        db.session.commit()

        return {
            'success': True,
            'message': f'{url.title} был успешно удалён',
        }, 200
