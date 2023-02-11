import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUrls} from "../../store/urls/actions";
import {selectUrlsModule} from "../../store/urls/selectors";
import {ProjectCard} from "../../elements/ProjectCard";
import {NavLink} from "react-router-dom";
import styles from "./styles.module.css";
import {selectIsAuth} from "../../store/auth/selectors";
import {CircularProgress} from "@mui/material";


export const SitesPage = () => {
    const dispatch = useDispatch();
    const allUrls = useSelector((state) => selectUrlsModule(state));
    const isAuth = useSelector((state) => selectIsAuth(state))

    useEffect(() => {
        if (!allUrls.loaded && isAuth) {
            dispatch(getUrls())
        }
    })

    if (!isAuth) {
        return <div>
            <h1>Вы не авторизованы</h1>
        </div>
    }

    if (!allUrls.loaded) {
        return <div style={{height: 'calc(100vh - 200px)', display: 'flex',
            alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress/>
        </div>
    }

    return <>
        <h2>Ваши сайты для отслеживания</h2>
        <section className={styles['card-container']}>
            {
                allUrls.urls.map(({id, title, description, url}) => <ProjectCard key={id}
                    title={title} description={description} link={url} id={id}/>)
            }

        </section>

        <NavLink to={"/create-url"} className={styles['card-container__add']}>
            <h1>
                <button className={styles['card-container__add-button'] + " outline"}>
                    Добавить
                </button>
            </h1>
        </NavLink>
    </>
}
