import styles from "./styles.module.css";
import {Navigate, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthModule} from "../../store/auth/selectors";
import {useEffect, useState} from "react";
import {changeInfo} from "../../store/auth/actions";
import {CircularProgress} from "@mui/material";


export const ProfilePage = () => {
    const {user, isAuth, loading} = useSelector((state) => selectAuthModule(state));

    const dispatch = useDispatch();

    // стейты для инпутов
    const [email, setEmail] = useState(user ? user.email : "");
    const [name, setName] = useState(user ? user.name : "");

    const handleSubmit = () => {
        dispatch(changeInfo({email, name}))
    }

    const reset = () => {
        setEmail(user.email);
        setName(user.name);
    }

    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setName(user.name);
        }
    }, [user])

    if (loading) {
        return <CircularProgress/>
    }

    if (!isAuth) {
        return <Navigate to="/login"/>
    }

    return (
        <form className={styles['wrapper']} onSubmit={() => handleSubmit()}>
        <article className={styles['root']}>
            <hgroup>
                <h1>Ваш аккаунт</h1>
                <h2>Основная информация</h2>
            </hgroup>

            <section className={styles['profile']}>
                <div className={styles['profile__property']}>
                    <h4 className={styles['profile__property-header']}>Имя</h4>
                    <input type="text" className={styles['profile__property-text']}
                           onChange={(e) => setName(e.target.value)} value={name}
                    />
                </div>

                <div className={styles['profile__property']}>
                    <h4 className={styles['profile__property-header']}>email</h4>
                    <input type="text" className={styles['profile__property-text']}
                           onChange={e => setEmail(e.target.value)} value={email}/>
                </div>

                <NavLink to="/activate" className={`${styles['profile__property']} ${styles['profile__property_link']}`}>
                    <h4 className={styles['profile__property-header']}>telegram</h4>
                    <p className={styles['profile__property-text']}>{user.telegram}</p>
                    <p className={styles['profile__property-link']}>〉</p>
                </NavLink>

                <NavLink to="/profile/password" className={`${styles['profile__property']} ${styles['profile__property_link']}`}>
                    <h4 className={styles['profile__property-header']}>Пароль</h4>
                    <p className={styles['profile__property-text']}>Пароль</p>
                    <p className={styles['profile__property-link']}>〉</p>
                </NavLink>

                <div className={styles['profile__buttons']}>
                    <button type='button' onClick={() => reset()}
                        className={"outline " + styles['profile__button']}>Отмена</button>
                    <button
                        className={styles['profile__button']}
                        disabled={user.name === name && user.email === email}>
                        Сохранить
                    </button>
                </div>

            </section>
        </article>
        </form>
    )
}


