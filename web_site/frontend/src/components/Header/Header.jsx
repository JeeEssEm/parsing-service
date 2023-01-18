import styles from "./styles.module.css";
import XparseLogo from "../../static/images/logo_xparse.png"
import {Button} from "../../elements/Button";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, selectIsLoading} from "../../store/auth/selectors";
import {logout} from "../../store/auth/actions";
// import {useEffect} from "react";
// import {checkAuth} from "../../store/auth/actions";

export const Header = () => {
    const isAuth = useSelector((state) => selectIsAuth(state));
    const isLoading = useSelector((state) => selectIsLoading(state));
    const dispatch = useDispatch();

    let profile = <>
        <NavLink to="/login"><button style_type="outlined" className={"outline"}>Войти</button></NavLink>
        <NavLink to="/register"><button style_type="filled">Зарегистрироваться</button></NavLink>
    </>

    if (isAuth) {
        profile = <>
            <NavLink to="/profile">Профиль</NavLink>
            <button onClick={() => dispatch(logout())}>Выйти из аккаунт</button>
        </>
    }

    if (isLoading) {
        profile = <h1>Загрузка...</h1>
    }

    return <header className={styles['header']}>

        <div className={styles['header__left']}>
            <img src={XparseLogo} alt="Xparse" className={styles['header__logo']}/>
            <div className={styles['header__pages']}>
                <NavLink to="/" //className={
                //     ({isActive}) => isActive ?
                //     styles['header__page'] + " " + styles['header__page-active'] : styles['header__page']
                // }
                >Главная
                </NavLink>
                <NavLink to="/site" //className={
                    // ({isActive}) => isActive ?
                    //     styles['header__page'] + " " + styles['header__page-active'] : styles['header__page']}
                >Сайты</NavLink>
            </div>
        </div>

        <div className={styles['header__auth']}>
            {/*Сюда дописать условие на авторизованность*/}
            {profile}
        </div>
        <div>
            {/*<a href="#" data-theme-switcher={"light"}>light</a>*/}
            {/*<a href="#" data-theme-switcher={"dark"}>dark</a>*/}
            <button className={"contrast theme-switcher"}>switch</button>
        </div>
    </header>
}

