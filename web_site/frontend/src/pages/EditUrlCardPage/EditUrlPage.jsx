import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUrlModule} from "../../store/url/selectors";
import {useEffect} from "react";
import {getUrlById} from "../../store/url/actions";
import {EditUrl} from "../../components/EditUrl";
import {CircularProgress} from "@mui/material";


export const EditUrlPage = () => {
    const {urlId} = useParams();
    const url = useSelector((state) => selectUrlModule(state));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUrlById({id: urlId}))
    }, [dispatch, urlId]);

    if (url.loading) {
        return <div style={{height: 'calc(100vh - 200px)', display: 'flex',
            alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress/>
        </div>
    }

    return <EditUrl {...url.url} id={url.id}/>
}

