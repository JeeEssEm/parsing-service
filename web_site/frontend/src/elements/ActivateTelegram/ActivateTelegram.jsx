import {Button} from "../Button";
import AuthCode from "react-auth-code-input";
import {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {ArrowLeft} from "feather-icons-react/build/IconComponents";
import {useNavigate} from "react-router-dom";
import ActivateTelegramService from "../../services/ActivateTelegramService";
//import {selectTelegram} from "../../store/auth/selectors";


export const ActivateTelegram = () => {
    let navigate = useNavigate();
    const [value, setValue] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        const resp = await ActivateTelegramService.EnterCode(value);
        // TODO: сделать вывод статуса
    }

    return (
        <div className={styles['page']}>
            <div className={styles['page__back']}>
                <h1>
                    <button onClick={() => navigate(-1)} className={styles['page__back-button']}
                            type='button'>
                        <ArrowLeft size={30}/>
                    </button>
                    Добавление телеграм аккаунта
                </h1>
            </div>
            <hr/>
            <form onSubmit={(e) => submit(e)} className={styles['form']}>
                <h1>Введите код, который отправил вам бот</h1>
                <AuthCode
                characters={6}
                allowedCharacters="numeric"
                inputClassName={styles['form__input-container']}
                containerClassName={styles['form__container']}
                onChange={(e) => setValue(e)}
                />
                <Button style_type="filled" type="submit" modificateStyles={styles['form__button']}>Готово</Button>

            </form>
        </div>

    )
}

