import {Header} from "../Header";
import {useSelector} from "react-redux";
import {selectMessageModule} from "../../store/message/selectors";
import {Alert} from "@mui/material";

export const Layout = ({children}) => {
    const message = useSelector((state) => selectMessageModule(state));

    return (
        <>
            <Header/>
            <main className={"container"}>
                {children}
                {message.message ?
                <Alert severity={!message.success ? "error" : "success"} style={{
                    position: "fixed",
                    bottom: 0,
                    right: 0
                }}>{message.message}</Alert>
                : ""
                }
            </main>
            {/*<footer className={""}>подвал</footer>*/}
        </>
    )
}