import {LoginForm} from "../../components/LoginForm";
import styles from "./styles.module.css";

export const LoginPage = () => {

    return (
        <div className={styles['login']}>
            <LoginForm/>
        </div>
    )
}

