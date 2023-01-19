import {NavLink} from "react-router-dom";


export const ProjectCard = (props) => {
    const {title, shortDescription, link} = props;

    // return (
    //     <Card>
    //         <CardContent>
    //             <Typography variant="h4">
    //                 {title}
    //             </Typography>
    //
    //             <Typography>
    //                 {shortDescription}
    //             </Typography>
    //
    //             <Typography color="text.secondary">
    //                 {link}
    //             </Typography>
    //         </CardContent>
    //     </Card>
    // )
    return (
        <NavLink to={"/"} style={{textDecoration: "none", maxWidth: "50%", minWidth: "30%"}}>
            <article>
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
    )
}