import {Card, CardContent, Typography} from "@mui/material";


export const ProjectCard = (props) => {
    const {title, shortDescription, link} = props;
    console.log(props);
    return (
        <Card>
            <CardContent>
                <Typography variant="h4">
                    {title}
                </Typography>

                <Typography>
                    {shortDescription}
                </Typography>

                <Typography color="text.secondary">
                    {link}
                </Typography>
            </CardContent>
        </Card>
    )
}