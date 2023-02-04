import styles from "./styles.module.css";

export const Designation = ({title, text}) => {

    return <div className={styles['block']}>
        <article>
            <hgroup>
                <h1>{title}</h1>
                <h1></h1>
            </hgroup>
            <p>{text}</p>
        </article>
    </div>
}

