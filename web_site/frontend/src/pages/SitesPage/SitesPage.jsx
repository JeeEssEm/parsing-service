import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUrls} from "../../store/urls/actions";
import {selectUrlsModule} from "../../store/urls/selectors";
import {ProjectCard} from "../../elements/ProjectCard";
import {NavLink} from "react-router-dom";


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
        <section className={"grid"}>
            {
                allUrls.urls.map(({title, description, url}) => <ProjectCard key={title}
                    title={title} description={description} link={url}/>)
            }
            <NavLink to={"/create-url"} style={{
                textDecoration: "none",
                maxWidth: "50%",
                minWidth: "30%",
                margin: "var(--block-spacing-vertical)",
                fontSize: "100%"
            }}>
                <button>
                    <h1>Добавить</h1>
                </button>
            </NavLink>
        </section>
    </>
}
