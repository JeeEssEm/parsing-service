import {Button} from "../../elements/Button";
import styles from "./styles.module.css";
import {NavLink} from "react-router-dom";

export const HeroBlock = () => {

    return (
        <section className={styles['hero']}>
            <h1 className={styles['hero__title']}>
                <nobr>Сервис для уведомления</nobr>
            </h1>

            <p className={styles['hero__text']}>
                Получение уведомлений, если информация на сайте изменяется. Уведомление через телеграм бота. Быстрая настройка
            </p>

            <div className={styles['hero__buttons']}>
                <NavLink to=""><Button style_type="outlined">Приступить</Button></NavLink>
                <NavLink to=""><Button style_type="filled">Гайд по настройке</Button></NavLink>
            </div>
        </section>
    )
}
