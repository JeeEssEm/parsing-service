import api from "../http";


export default class AuthService {
    static async login(name, password) {
        return api.post('/auth/api/users/login', {
            "name": name,
            "password": password
        }).then((resp) => {
            if (resp.data.success) {
                localStorage.setItem('token', resp.data.access_token)
            }
            return resp;
        })
    }

    static async registration(name, password) {
        return api.post('/auth/api/users/register', {
            "name": name,
            "password": password,
        }).then((response) => {
            console.log(response);
            if (response.data.success) {
                localStorage.setItem('token', response.data.access_token)
            }

            return response
        })
    }

    static async logout() {
        localStorage.removeItem('token')
        return api.post('/auth/api/users/logout')
    }

    static getCurrentUser = () => {
        return JSON.parse(localStorage.getItem('user'))
    }

    static changeUserInfo = ({name}) => {
        return api.post('/user/api/change', {
            // 'email': email,
            'name': name
        })
    }
}

