import React from 'react';
import '../styles/AboutProject.css';
import Wirth from '../images/Wirth_w.png';

const AboutProject = () => {
    return(
        <div>
            {/*Фон*/}
            <ul className={"background"}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>

            <div className={"glass"}>
                <div className="page-wrapper">
                    <div className="content-wrapper">
                        <input type="radio" name="toggle" id="toggle1" className={"input_new"}/>
                        <input type="radio" name="toggle" id="toggle2" className={"input_new"}/>
                        <input type="radio" name="toggle" id="toggle3" className={"input_new"}/>
                        <section id="section-1">
                            <div className="image-container">
                                <h1>Оберон-2</h1>
                                <p>Оберон-2 - язык программирования, проверенный временем - является надёжным инструментом для изучения основ работы разработчика.
                                    Однако отсутствие удобных онлайн-компиляторов затрудняет работу с этим языком.</p>
                                <p>Разработанный нашей командой онлайн-компилятор удовлетворяет современным требованиям функционала и оформления.
                                    Поэтому мы верим, что обновлённый подход к созданию сервера увеличит количество пользователей языка Оберон-2!
                                </p>
                            </div>
                            <div className="info-container">
                                <img src={Wirth} width={"400vh"} alt={"Wirth"}/>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AboutProject;