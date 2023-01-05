import api from "../http";


export default class UrlService {
    static fetchUrls() {
        return api.get('/urls/api/...')
    }

    static fetchUrl(id) {
        return api.get(`/urls/api/url/${id}`)
    }
}