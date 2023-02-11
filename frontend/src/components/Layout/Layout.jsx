import {Header} from "../Header";
import {useDispatch, useSelector} from "react-redux";
import {selectMessageModule} from "../../store/message/selectors";
import {Alert} from "@mui/material";
import {useEffect} from "react";
import {clearMessage} from "../../store/message";

export const Layout = ({children}) => {
    const message = useSelector((state) => selectMessageModule(state));
    const dispatch = useDispatch();

    const disappear = () => {
        if (message.message) {
            setTimeout(() => dispatch(clearMessage()), 5000);
        }
    }

    useEffect(() => {
        disappear();
    })

    return (
        <>
            <Header/>
            <main className={"container-fluid"} style={{
                marginTop: "1.2rem"
            }}>
                {children}
                {message.message ?
                <Alert severity={!message.success ? "error" : "success"} style={{
                    position: "fixed",
                    bottom: 0,
                    right: 0,
                }}>{message.message}</Alert>
                : ""
                }
            </main>
            {/*<footer className={""}>подвал</footer>*/}
        </>
    )
}