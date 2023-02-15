import styles from "./styles.module.css";
import XparseLogo from "../../static/images/logo_xparse.png";
import {Navigate, NavLink} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthModule} from "../../store/auth/selectors";
import {login} from "../../store/auth/actions";

export const LoginForm = () => {
    const {loading, user, isAuth} = useSelector((state) => selectAuthModule(state));
    const [nameState, setName] = useState('');
    const [passwordState, setPassword] = useState('');
    const dispatch = useDispatch();

    if (loading) {
        return <h1>Загрузка...</h1>
    }

    if (isAuth) {
        return <Navigate to={'/'}/>
    }

    const handleLogin = () => {
        dispatch(login(
            {
                name: nameState,
                password: passwordState
            }
        ))
    }


    return (
        <article className={styles['login_wrapper']}>
            <form className={styles['login']}>
                <img src={XparseLogo} alt="Xparse" className={styles['login__logo']}/>
                <input type="text" placeholder="Логин" /*className={styles['login__input']}*/ onChange={e => setName(e.target.value)} value={nameState}/>
                <input type="password" placeholder="Пароль" /*className={styles['login__input']}*/ onChange={e => setPassword(e.target.value)} value={passwordState}/>
                    <button /*style_type="filled" style={{width: `70%`}}*/ onClick={() => handleLogin()}>Войти</button>
                <div className={styles['login__actions']}>
                   <NavLink to="/register" /*className={styles['login__link']}*/>Зарегистрироваться</NavLink>
                   <NavLink to="/profile/password" /*className={styles['login__link']}*/>Забыли пароль?</NavLink>
                </div>
            </form>
        </article>
    )
}

