
export default class DataValidationService {
    static validatePassword(password, repeatedPassword) {
        const regexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (password !== repeatedPassword) {
            return [
                false,
                'Пароли не совпадают'
            ]
        }

        if (regexp.test(password)) {
            return [
                true,
                 ''
            ]
        }

        return [
            false,
            'Пароль должен содержать минимум одну,' +
                ' цифру одну букву, и длина должна быть не меньше 8 символов'
        ]
    }

    static validateLogin(login) {
        if (login.length < 2 || login.length > 31) {
            return [
                false,
                'Длина логина должна быть не меньше 2 символов и' +
                    ' не больше 32 символов'
            ]
        }

        return [
            true,
            ''
        ]
    }
}

