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
}