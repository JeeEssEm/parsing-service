import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUrlById} from "../../store/url/actions";
import {selectUrlModule} from "../../store/url/selectors";
import {getUrls} from "../../store/urls/actions";
import {selectUrlsModule} from "../../store/urls/selectors";
import {ProjectCard} from "../../elements/ProjectCard";
import {Container} from "@mui/material";


export const SitesPage = () => {
    const dispatch = useDispatch();
    const allUrls = useSelector((state) => selectUrlsModule(state));


    useEffect(() => {
        if (!allUrls.loaded) {
            dispatch(getUrls())
        }
    })

    return <section>
        <h2>SitesPage</h2>
        <Container>
            {
                allUrls.urls.map(({title, description, url}) => <ProjectCard key={title}
                    title={title} description={description} link={url}/>)
            }
        </Container>
    </section>
}
