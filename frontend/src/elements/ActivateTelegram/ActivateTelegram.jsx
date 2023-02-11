import AuthCode from "react-auth-code-input";
import {useState} from "react";
import styles from "./styles.module.css";
import ActivateTelegramService from "../../services/ActivateTelegramService";
import {useDispatch} from "react-redux";
import {setMessage, setSuccessMessage} from "../../store/message";
//import {selectTelegram} from "../../store/auth/selectors";


export const ActivateTelegram = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        try {
            const resp = await ActivateTelegramService.EnterCode(value);

            if (resp.data.status === 200) {
                dispatch(setMessage(resp.data))
            }
            else {
                dispatch(setSuccessMessage(resp.data))
            }
        }
        catch (e) {
            dispatch(setMessage(e.response.data))
        }
    }

    return (
        <form onSubmit={(e) => submit(e)}>
            <h1>Введите код, который отправил вам бот</h1>
            <AuthCode
            characters={6}
            allowedCharacters="numeric"
            inputClassName={styles['form__input-container']}
            containerClassName={styles['form__container']}
            onChange={(e) => setValue(e)}
            />
            <button className={styles['form__button']}>Готово</button>
        </form>
    )
}

