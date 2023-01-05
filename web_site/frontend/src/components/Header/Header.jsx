import styles from "./styles.module.css";
import XparseLogo from "../../static/images/logo_xparse.png"
import {Button} from "../../elements/Button";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, selectIsLoading} from "../../store/auth/selectors";
import {useEffect} from "react";
import {checkAuth} from "../../store/auth/actions";

export const Header = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
    })

    const isAuth = useSelector((state) => selectIsAuth(state));
    const isLoading = useSelector((state) => selectIsLoading(state));

    let profile = <>
        <NavLink to="/login"><Button style_type="outlined">Войти</Button></NavLink>
        <NavLink to="/register"><Button style_type="filled">Зарегистрироваться</Button></NavLink>
    </>

    if (isAuth) {
        profile = <h1>Вы авторизованы</h1>
    }

    if (isLoading) {
        profile = <h1>Загрузка...</h1>
    }

    return <header className={styles['header']}>

        <div className={styles['header__left']}>
            <img src={XparseLogo} alt="Xparse" className={styles['header__logo']}/>
            <div className={styles['header__pages']}>
                <NavLink to="/" className={
                    ({isActive}) => isActive ?
                    styles['header__page'] + " " + styles['header__page-active'] : styles['header__page']
                }>Главная
                </NavLink>
                <NavLink to="/site" className={
                    ({isActive}) => isActive ?
                        styles['header__page'] + " " + styles['header__page-active'] : styles['header__page']
                }>Сайты</NavLink>
            </div>
        </div>

        <div className={styles['header__auth']}>
            {/*Сюда дописать условие на авторизованность*/}
            {profile}
        </div>
    </header>
}

