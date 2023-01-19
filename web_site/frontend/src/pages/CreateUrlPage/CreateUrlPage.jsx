
export const CreateUrlPage = () => {

    return (
        <article>
            <form action="">
                <h1>Создать сайт для отслеживания</h1>
                <input type="text" placeholder={"Название"}/>
                <textarea placeholder={"Описание"}/>
                <input type="text" placeholder={"url"}/>
                <input type="text" placeholder={"xpath"}/>

                <select name="" id="">
                    <option value selected disabled>Тип (число/строка)</option>
                    <option value="">Число</option>
                    <option value="">Строка</option>
                </select>

                <select>
                    <option value="">Равенство</option>
                    {/*TODO: сделать условие на число (сравнение)*/}
                    <option value="">Любое изменение</option>
                    <option value="">Появление</option>
                    <option value="">Больше</option>
                    <option value="">Меньше</option>
                </select>

            </form>
        </article>
    )
}

