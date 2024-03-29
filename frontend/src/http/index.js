import axios from "axios";

export const API_URL = "http://127.0.0.1:5000/"

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use(config => {
    config.headers.Authorization = `${localStorage.getItem('token')}`
    config.withCredentials = true;
    return config;
})


api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${API_URL}auth/api/users/refresh`, {
                withCredentials: true
            })
            localStorage.setItem('token', response.data.access_token);
        }

        catch (e) {
            console.log('Не авторизован')
        }

        return api.request(originalRequest);
    }

    // сюда дописать обработку ошибок (сделать типа вывод ошибок в правый нижний угол), а пока...
    throw error;
})

export default api;

