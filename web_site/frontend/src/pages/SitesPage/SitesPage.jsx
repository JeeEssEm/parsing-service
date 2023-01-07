import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUrlById} from "../../store/url/actions";
import {selectUrlModule} from "../../store/url/selectors";
import {getUrls} from "../../store/urls/actions";
import {selectUrlsModule} from "../../store/urls/selectors";


export const SitesPage = () => {
    const [id_, setId] = useState('1');
    const dispatch = useDispatch();
    const singleUrl = useSelector((state) => selectUrlModule(state));
    const allUrls = useSelector((state) => selectUrlsModule(state));

    const getUrl = (id) => {
        dispatch(getUrlById({id}))
    }

    const getShortUrls = () => {
        dispatch(getUrls())
    }

    return <section>
        <h2>SitesPage</h2>
        <button onClick={() => getUrl(id_)}>Найти id</button>
        <input type="text" value={id_} onChange={e => setId(e.target.value)}/>
        <pre>
            {
             JSON.stringify(singleUrl)
            }
        </pre>
        <button onClick={() => getShortUrls()}>Получить все url</button>
        <pre>
            {
                JSON.stringify(allUrls)
            }
        </pre>
    </section>
}
