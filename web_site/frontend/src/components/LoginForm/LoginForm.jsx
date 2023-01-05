import {Button} from "../../elements/Button";
import styles from "./styles.module.css";
import XparseLogo from "../../static/images/logo_xparse.png";
import {Navigate, NavLink} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthModule} from "../../store/auth/selectors";
import {login} from "../../store/auth/actions";

export const LoginForm = () => {
    const {loading, user, isAuth} = useSelector((state) => selectAuthModule(state));
    const [emailState, setEmail] = useState('');
    const [passwordState, setPassword] = useState('');
    const dispatch = useDispatch();

    if (loading) {
        return <h1>Загрузка...</h1>
    }

    if (isAuth) {
        console.log(user);
        return <Navigate to={'/'}/>
    }

    const handleLogin = () => {
        dispatch(login(
            {
                email: emailState,
                password: passwordState
            }
        ))
    }


    return (
        <form className={styles['login']}>
            <img src={XparseLogo} alt="Xparse" className={styles['login__logo']}/>
            <input type="text" placeholder="email" className={styles['login__input']} onChange={e => setEmail(e.target.value)} value={emailState}/>
            <input type="password" placeholder="Пароль" className={styles['login__input']} onChange={e => setPassword(e.target.value)} value={passwordState}/>
                <Button style_type="filled" style={{width: `70%`}} onClick={() => handleLogin()}>Войти</Button>
            <div className={styles['login__actions']}>
               <NavLink to="/register" className={styles['login__link']}>Зарегистрироваться</NavLink>
               <NavLink to="/" className={styles['login__link']}>Забыли пароль?</NavLink>
            </div>
        </form>
    )
}

