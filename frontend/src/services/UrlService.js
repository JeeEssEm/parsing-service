import api from "../http";


export default class UrlService {
    static fetchUrls() {
        return api.get('/urls/api/urls')
    }

    static fetchUrlById(id) {
        return api.get(`/urls/api/url`, {
            params: {
                'url_id': id
            }
        })
    }

    static createUrl({xpath, title, description, url, type, comparer, appearedValue, edit}) {
        return api.post(`urls/api/url`, {
            'xpath': xpath,
            'title': title,
            'url': url,
            'description': description,
            'type': type,
            'comparer': comparer,
            'appearedValue': appearedValue,
            'edit': edit
        })
    }

    static removeUrl({id}) {
        return api.post(`urls/api/url/remove`, {
            'url_id': id
        })
    }
}
