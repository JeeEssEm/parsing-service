import styles from "../../elements/ActivateTelegram/styles.module.css";
import {ActivateTelegram} from "../../elements/ActivateTelegram";
import {ChangePassword} from "../../components/ChangePassword";
import {ArrowLeft} from "feather-icons-react/build/IconComponents";
import {useNavigate, useParams} from "react-router-dom";



export const ActivateOrChange = ({activate}) => {
    let navigate = useNavigate();
    const { code } = useParams();
    let form = <ChangePassword code={code}/>;


    if (activate) {
        form = <ActivateTelegram/>;
    }

    return (<div className={styles['page']}>
        <div className={styles['page__back']}>
            <h1 style={{display: "flex"}}>
                <button onClick={() => navigate(-1)} className={styles['page__back-button']}
                        type='button'>
                    <ArrowLeft size={30}/>
                </button>
                {activate ? "Добавление телеграм аккаунта" : "Смена пароля"}
            </h1>
        </div>

        <hr style={{margin: "0 auto", borderTop: "1px solid #293745"}}/>

        <article className={styles['form']}>
            {form}
        </article>
    </div>)
}

