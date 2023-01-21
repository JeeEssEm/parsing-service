import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUrls} from "../../store/urls/actions";
import {selectUrlsModule} from "../../store/urls/selectors";
import {ProjectCard} from "../../elements/ProjectCard";
import {NavLink} from "react-router-dom";
import styles from "./styles.module.css";


export const SitesPage = () => {
    const dispatch = useDispatch();
    const allUrls = useSelector((state) => selectUrlsModule(state));


    useEffect(() => {
        if (!allUrls.loaded) {
            dispatch(getUrls())
        }
    })

    return <>
        <h2>Ваши сайты для отслеживания</h2>
        <section className={styles['card-container']}>
            {
                allUrls.urls.map(({title, description, url}) => <ProjectCard key={title}
                    title={title} description={description} link={url}/>)
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
