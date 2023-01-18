import api from "../http";


export default class ActivateTelegramService {

    static async EnterCode(code) {
        return api.post('/telegram/api/activate', {
            'telegram_code': code
        })
    }

}

