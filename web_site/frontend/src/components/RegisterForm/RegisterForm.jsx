import styles from "./styles.module.css";
import {Navigate, NavLink} from "react-router-dom";
import XparseLogo from "../../static/images/logo_xparse.png";
import {useDispatch, useSelector} from "react-redux";
// import {authSlice} from "../../store/auth";
// import AuthService from "../../services/AuthService";
import {register} from "../../store/auth/actions";
import {selectAuthModule} from "../../store/auth/selectors";
import {useState} from "react";



export const RegisterForm = () => {
    const { loading, user, isAuth } = useSelector(
        (state) => selectAuthModule(state)
    )
    // const [emailState, setEmail] = useState('');
    const [nameState, setName] = useState('');
    const [passwordState, setPassword] = useState('');
    const [repeatPasswordState, setRepeatPassword] = useState('');

    const dispatch = useDispatch();

    if (isAuth) {
        console.log(user);
        return <Navigate to={'/'}/>
    }

    const handleRegister = () => {
        dispatch(register(
            {
                // email: emailState,
                name: nameState,
                password: passwordState
            }
        ))
    }

    if (loading) {
        return <h1>Загрузка...</h1>
    }

    console.log(user);
    console.log(isAuth);

    return (
        <article className={styles['register_wrapper']}>
            <form className={styles['register']}>
                <img src={XparseLogo} alt="Xparse" className={styles['register__logo']}/>
                <input type="text" placeholder="Логин" /*className={styles['register__input']}*/
                       required onChange={e => setName(e.target.value)} value={nameState}/>
                {/*<input type="text" placeholder="email" /*className={styles['register__input']}*/}
                {/*       required onChange={e => setEmail(e.target.value)} value={emailState}/>*/}
                <input type="password" placeholder="Пароль" /*className={styles['register__input']}*/
                       required onChange={e => setPassword(e.target.value)} value={passwordState}/>
                <input type="password" placeholder="Повторите пароль" /*className={styles['register__input']}*/
                       required onChange={e => setRepeatPassword(e.target.value)} value={repeatPasswordState}/>
                <p className={styles['register__personal']}>
                    <input type="checkbox" role="switch" className={styles['register__checkbox']} required/>
                    Даю согласие на обработку персональных данных
                </p>
                <button /*style_type="filled"*/ style={{width: `70%`}} onClick={() => handleRegister()}>Зарегистрироваться</button>
                <div className={styles['register__actions']}>
                    <NavLink to="/login" /*className={styles['register__link']}*/>Войти</NavLink>
                    <NavLink to="/" /*className={styles['register__link']}*/>Забыли пароль?</NavLink>
                </div>
            </form>
        </article>
    )
}
