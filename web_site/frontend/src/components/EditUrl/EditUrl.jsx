import {NavLink} from "react-router-dom";
import {useState} from "react";
import styles from "./styles.module.css";
import {useDispatch} from "react-redux";
import {createUrl, getUrlById} from "../../store/url/actions";

const types = {
    numeric: "Numeric",
    string: "String"
}

const comparers = {
    equal: 'EQUALITY',
    appeared: 'APPEARED',
    comparison_up: "COMPARISON_UP",
    comparison_down: "COMPARISON_DOWN",
    change: "CHANGE"
}


export const EditUrl = (props) => {
    const {xpath, url, description, title, appearedValue, type, comparer, id} = props;

    const dispatch = useDispatch();
    // стейты для значений
    const [type_, setType] = useState(type ? type : types.numeric);
    const [comparer_, setComparer] = useState(comparer ? comparer : comparers.equal);

    // стейты для инпутов
    const [xpath_, setXpath] = useState(xpath ? xpath : "");
    const [url_, setUrl] = useState(url ? url : "");
    const [description_, setDescription] = useState(description ? description : "");
    const [title_, setTitle] = useState(title ? title : "");
    const [appearedValue_, setAppearedValue] = useState(appearedValue ? appearedValue : "");

    // валидация формы
    const handleSubmit = () => {
        // console.log({
        //     title: title_,
        //     url: url_,
        //     xpath: xpath_,
        //     description: description_,
        //     type: type_,
        //     comparer: comparer_,
        //     appearedValue: appearedValue_
        // });

        const resp = dispatch(createUrl({
            title: title_,
            url: url_,
            xpath: xpath_,
            description: description_,
            type: type_,
            comparer: comparer_,
            appearedValue: appearedValue_,
            edit: !!props
        }));

        if (!!props) {
            resp.then(() => {
                dispatch(getUrlById({id}))
            })
        }
    }

    return (
        <article>
            <form action="" className={styles['create-form']} onSubmit={() => handleSubmit()}>
                <h1>{ !!props ? "Редактировать" : "Создать" } сайт для отслеживания</h1>
                <input type="text" placeholder={"Название"} value={title_}
                       onChange={(e) => setTitle(e.target.value)}/>

                <textarea placeholder={"Описание"} className={styles['create-form__textarea']}
                          value={description_} onChange={(e) => setDescription(e.target.value)}/>
                <input type="text" placeholder={"url"} value={url_} onChange={(e) => setUrl(e.target.value)} required/>

                <div>
                    <input type="text" placeholder={"xpath"} style={{
                        marginBottom: "0.2rem"
                    }} disabled={comparer_ === comparers.appeared}
                           value={xpath_} onChange={(e) => setXpath(e.target.value)}/>
                    <NavLink to={"/"}><p className={styles['create-form__link']}>Где найти xpath?</p></NavLink>
                </div>

                <select onChange={(e) => setType(e.target.value)}>
                    <option defaultValue disabled>Тип (число/строка)</option>
                    <option value={types.numeric}>Число</option>
                    <option value={types.string}>Строка</option>
                </select>

                <select onChange={(e) => setComparer(e.target.value)}>
                    <option defaultValue disabled>Условие сравнения</option>
                    <option value={comparers.equal}>Равенство</option>
                    {
                        type === types.numeric ? <>
                            <option value={comparers.comparison_up}>Больше</option>
                            <option value={comparers.comparison_down}>Меньше</option>
                        </> : ""
                    }
                    <option value={comparers.change}>Любое изменение</option>
                    <option value={comparers.appeared}>Появление (xpath указывать не нужно)</option>
                </select>

                {
                    [comparers.appeared, comparers.equal].indexOf(comparer) !== -1 ? <>
                        <input type="text" placeholder={"Введите значение, которое должно появиться"}
                               value={appearedValue_} onChange={(e) => setAppearedValue(e.target.value)}/>
                    </> : ""
                }

                <button>Сохранить</button>
            </form>
        </article>
    )
}

