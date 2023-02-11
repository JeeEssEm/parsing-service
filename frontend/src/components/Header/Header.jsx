import styles from "./styles.module.css";
import XparseLogo from "../../static/images/logo_xparse.png"
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, selectIsLoading} from "../../store/auth/selectors";
import {logout} from "../../store/auth/actions";
import {CircularProgress} from "@mui/material";
// import {useEffect} from "react";
// import {checkAuth} from "../../store/auth/actions";

export const Header = () => {
    const isAuth = useSelector((state) => selectIsAuth(state));
    const isLoading = useSelector((state) => selectIsLoading(state));
    const dispatch = useDispatch();

    let profile = <>
        <NavLink to="/login" style={{textDecoration: "none"}}><button className={"outline"}>Войти</button></NavLink>
        <NavLink to="/register" style={{textDecoration: "none"}}><button >Зарегистрироваться</button></NavLink>
    </>

    if (isAuth) {
        profile = <>
            <NavLink to="/profile">Профиль</NavLink>
            <button style={{
                width: "max-content",
            }}
                    onClick={() => dispatch(logout())}>
                Выйти из аккаунт
            </button>
        </>
    }

    if (isLoading) {
        profile = <CircularProgress/>
    }

    return <header className={styles['header'] + " container-fluid"}>

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
            {profile}
        </div>
    </header>
}

