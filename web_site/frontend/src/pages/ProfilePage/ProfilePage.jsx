import styles from "./styles.module.css";
import {Navigate, NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectAuthModule} from "../../store/auth/selectors";
import {useEffect, useState} from "react";


export const ProfilePage = () => {
    const {user, isAuth, loading} = useSelector((state) => selectAuthModule(state));
    const [email, setEmail] = useState(user ? user.email : "");
    const [name, setName] = useState(user ? user.name : "");

    useEffect(() => {
        if (user) {
            if (user.email !== email) {
                setEmail(user.email)
            }
            if (user.name !== name) {
                setName(user.name)
            }
        }
    }, [user, email, name])

    if (loading) {
        return <h1>Загрузка</h1>
    }

    if (!isAuth) {
        return <Navigate to="/login"/>
    }

    return (
        <div className={styles['wrapper']}>
        <article className={styles['root']}>
            <hgroup >
                <h1>Ваш аккаунт</h1>
                <h2>Основная информация</h2>
            </hgroup>

            <section className={styles['profile']}>

                {/*<div className={styles['profile__property']}>*/}
                {/*    <h4 className={styles['profile__property-header']}>Фотография</h4>*/}

                {/*</div>*/}

                <div className={styles['profile__property']}>
                    <h4 className={styles['profile__property-header']}>Имя</h4>
                    <input type="text" className={styles['profile__property-text']}
                           onChange={e => setName(e.target.value)} value={name}
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

                <NavLink to="" className={`${styles['profile__property']} ${styles['profile__property_link']}`}>
                    <h4 className={styles['profile__property-header']}>Пароль</h4>
                    <p className={styles['profile__property-text']}>Пароль</p>
                    <p className={styles['profile__property-link']}>〉</p>
                </NavLink>

                <div className={styles['profile__buttons']}>
                    <button /*style_type="outlined" modificateStyles={styles['profile__button']}*/
                        className={"outline " + styles['profile__button']}>Отмена</button>
                    <button /*style_type="filled" modificateStyles={styles['profile__button']}*/
                        className={styles['profile__button']}>Сохранить</button>
                </div>

            </section>
        </article>
        </div>
    )
}

