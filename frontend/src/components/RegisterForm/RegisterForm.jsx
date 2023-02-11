import styles from "./styles.module.css";
import {Navigate, NavLink} from "react-router-dom";
import XparseLogo from "../../static/images/logo_xparse.png";
import {useDispatch, useSelector} from "react-redux";
// import {authSlice} from "../../store/auth";
// import AuthService from "../../services/AuthService";
import {register} from "../../store/auth/actions";
import {selectAuthModule} from "../../store/auth/selectors";
import {useState} from "react";
import DataValidationService from "../../services/DataValidationService";
import {setMessage} from "../../store/message";



export const RegisterForm = () => {
    const { loading, user, isAuth } = useSelector(
        (state) => selectAuthModule(state)
    )
    const [nameState, setName] = useState('');
    const [passwordState, setPassword] = useState('');
    const [repeatPasswordState, setRepeatPassword] = useState('');
    const dispatch = useDispatch();

    if (isAuth) {
        return <Navigate to={'/'}/>
    }

    const handleRegister = (e) => {
        e.preventDefault();

        const [loginStatus, loginMessage] = DataValidationService.validateLogin(nameState);
        const [passwordStatus, passwordMessage] = DataValidationService.validatePassword(passwordState, repeatPasswordState);

        console.log(passwordMessage)
        if (!loginStatus) {
            dispatch(setMessage({message: loginMessage}));
            return;
        }

        else if (!passwordStatus) {
            dispatch(setMessage({message: passwordMessage}));
            return;
        }

        if (loginStatus && passwordStatus) {
            dispatch(register(
                {
                    name: nameState,
                    password: passwordState
                }
            ))
        }

    }

    if (loading) {
        return <h1>Загрузка...</h1>
    }

    return (
        <article className={styles['register_wrapper']}>
            <form className={styles['register']} onSubmit={(e) => handleRegister(e)}>
                <img src={XparseLogo} alt="Xparse" className={styles['register__logo']}/>
                <input type="text" placeholder="Логин"
                       required onChange={e => setName(e.target.value)} value={nameState}/>

                <input type="password" placeholder="Пароль"
                       required onChange={e => setPassword(e.target.value)} value={passwordState}/>
                <input type="password" placeholder="Повторите пароль"
                       required onChange={e => setRepeatPassword(e.target.value)} value={repeatPasswordState}/>
                <p className={styles['register__personal']}>
                    <input type="checkbox" role="switch" className={styles['register__checkbox']} required/>
                    Соглашаюсь с <NavLink to={"/privacy"}>политикой конфиденциальности</NavLink>
                </p>
                <button style={{width: `70%`}}>Зарегистрироваться</button>
                <div className={styles['register__actions']}>
                    <NavLink to="/login">Войти</NavLink>
                    <NavLink to="/">Забыли пароль?</NavLink>
                </div>
            </form>
        </article>
    )
}
