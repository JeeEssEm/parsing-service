import {Designation} from "../../components/Designation";
import copy_xpath from "../../static/images/copy_xpath.png";
import open_site from "../../static/images/open_site.png";
import select_el from "../../static/images/select_el.png";
import dev_tools from "../../static/images/dev_tools.png";
import create_site from "../../static/images/create_site.png";
import open_url from "../../static/images/open_url.png";
import choose_type from "../../static/images/choose_type.png";
import string_chooses from "../../static/images/string_chooses.png";
import number_chooses from "../../static/images/number_chooses.png";


export const UserGuidePage = () => {
    const text = <>
        <h2>Как найти xpath?</h2>
        <ol>
            <li>
                <h4>Открыть нужный сайт</h4>
                <img src={open_site} alt="открыть сайт"/>
            </li>
            <li>
                <h4>Открыть консоль разработчика (F12)</h4>
                <img src={dev_tools} alt="открыть сайт"/>
            </li>
            <li>
                <h4>Выбрать необходимый элемент с текстом</h4>
                <img src={select_el} alt="открыть сайт"/>
            </li>
            <li>
                <h4>Копировать xpath</h4>
                <img src={copy_xpath} alt="открыть сайт"/>
            </li>
        </ol>
        <hr/>
        <h2>Как настроить сайт для парсинга?</h2>
        <ol>
            <li>
                <h4>Перейдите на страницу создания</h4>
                <img src={open_url} alt=""/>
            </li>
            <li>
                <h4>Заполните название, описание, url и xpath</h4>
                <img src={create_site} alt=""/>
            </li>

            <li>
                <h4>Выберите тип(число/строка)</h4>
                <img src={choose_type} alt=""/>
            </li>

            <li>
                <h4>Выберите условие сравнения:</h4>
                <ul>
                    <li>
                        <h5>Для строки:</h5>
                        <img src={string_chooses} alt=""/>
                    </li>

                  <li>
                      <h5>Для числа:</h5>
                      <img src={number_chooses} alt=""/>
                  </li>
                </ul>
            </li>
        </ol>
    </>;

    return <Designation title={"Гайд по получению xpath"} text={text}/>

}
