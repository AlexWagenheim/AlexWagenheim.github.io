import React from 'react';
import '../styles/AboutDevelopers.css'
import down from '../images/down.png'
import up from '../images/up.png'
import vk from '../images/vk.png'
import tg from '../images/tg.png'
import gh from '../images/gh.png'

const AboutDevelopers = () => {
    return (
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
                                            <h1>Вагенгейм Александр</h1>
                                            <h2>BACKEND</h2>
                                            <div className={"contacts"}>
                                                <a href={"#/"}><img src={vk} width={'35px'} alt={"vk"}/></a>
                                                <a href={"#/"}><img src={gh} width={'35px'} alt={"gh"}/></a>
                                                <a href={"#/"}><img src={tg} width={'35px'} alt={"tg"}/></a>
                                            </div>
                                        </div>
                                        <div className="info-container">
                                            <h1>Фото 1</h1>
                                            <label htmlFor="toggle2" className={"label_new"}><img src={up} width={'30px'} alt={"up"}/></label>
                                        </div>
                                    </section>
                                    <section id="section-2">
                                        <div className="image-container">
                                            <h1>Лебедева Ксения</h1>
                                            <div className={"in"}><h2>FRONTEND</h2></div>
                                            <div className={"contacts"}>
                                                <a href={"https://vk.com/kcioiiia17"}><img src={vk} width={'35px'} alt={"vk"}/></a>
                                                <a href={"https://github.com/KCIOIIIA"}><img src={gh} width={'35px'} alt={"gh"}/></a>
                                                <a href={"https://t.me/KCIOIIIA"}><img src={tg} width={'35px'} alt={"tg"}/></a>
                                            </div>
                                        </div>
                                        <div className="info-container">
                                            <h1>Фото 2</h1>
                                            <label htmlFor="toggle3" className={"label_new"}><img src = {down} width={'30px'} alt={"down"}/></label>
                                        </div>
                                    </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutDevelopers;