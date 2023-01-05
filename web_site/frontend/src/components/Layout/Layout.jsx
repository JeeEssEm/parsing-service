import {Header} from "../Header";

export const Layout = ({children}) => {

    return (
        <section>
            <Header/>
            <main>{children}</main>
        </section>
    )
}