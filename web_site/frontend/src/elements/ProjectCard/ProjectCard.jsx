import {NavLink} from "react-router-dom";
import styles from "./styles.module.css";


export const ProjectCard = (props) => {
    const {id, title, shortDescription, link} = props;

    return (
        <div className={styles["project-card"]}>
            <NavLink to={`/edit-url/${id}`}>
                <article className={styles['project-card__article']}>
                    <div>
                        <hgroup>
                            <h1>{title}</h1>
                            <h2>{link}</h2>
                        </hgroup>
                        <div>
                            {shortDescription}
                        </div>
                    </div>
                </article>
            </NavLink>
        </div>
    )
}