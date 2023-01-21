import {NavLink} from "react-router-dom";
import {useState} from "react";
import styles from "./styles.module.css";
import {useDispatch} from "react-redux";
import {createUrl} from "../../store/url/actions";

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


export const CreateUrlPage = () => {
    const dispatch = useDispatch();
    // стейты для значений
    const [type, setType] = useState(types.numeric);
    const [comparer, setComparer] = useState(comparers.equal);

    // стейты для инпутов
    const [xpath, setXpath] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [appearedValue, setAppearedValue] = useState("");

    // валидация формы
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            title,
            url,
            xpath,
            description,
            type,
            comparer,
            appearedValue
        });

        dispatch(createUrl({
            title,
            url,
            xpath,
            description,
            type,
            comparer,
            appearedValue
        }))
    }

    return (
        <article>
            <form action="" className={styles['create-form']} onSubmit={(e) => handleSubmit(e)}>
                <h1>Создать сайт для отслеживания</h1>
                <input type="text" placeholder={"Название"} value={title}
                       onChange={(e) => setTitle(e.target.value)}/>

                <textarea placeholder={"Описание"} className={styles['create-form__textarea']}
                          value={description} onChange={(e) => setDescription(e.target.value)}/>
                <input type="text" placeholder={"url"} value={url} onChange={(e) => setUrl(e.target.value)} required/>

                <div>
                    <input type="text" placeholder={"xpath"} style={{
                        marginBottom: "0.2rem"
                    }} disabled={comparer === comparers.appeared}
                           value={xpath} onChange={(e) => setXpath(e.target.value)}/>
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
                        value={appearedValue} onChange={(e) => setAppearedValue(e.target.value)}/>
                    </> : ""
                }

                <button>Создать</button>
            </form>
        </article>
    )
}

