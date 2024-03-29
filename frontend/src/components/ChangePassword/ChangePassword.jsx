import {useState} from "react";
import {useDispatch} from "react-redux";
import {changePassword} from "../../store/auth/actions";
import {setMessage} from "../../store/message";
import DataValidationService from "../../services/DataValidationService";


export const ChangePassword = (_code) => {
    const dispatch = useDispatch();
    const { code } = _code;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        let [status, message] = DataValidationService.validatePassword(password, confirmPassword)

        if (!status) {
            dispatch(setMessage({message: message}));
        }
        else {
            dispatch(changePassword({resetCode: code, newPassword: password}))
        }
    }

    return <>
        <hgroup>
            <h1>Изменение пароля</h1>
            <h1></h1>
        </hgroup>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
            <input type="password" placeholder={"Введите новый пароль"} value={password}
                   onChange={e => setPassword(e.target.value)}/>
            <input type="password" placeholder={"Повторите пароль"} value={confirmPassword}
                   onChange={e => setConfirmPassword(e.target.value)}/>
            <button>Сохранить</button>
        </form>
    </>
}
