import React from 'react';
import '../styles/Login.css'

const Login = () => {
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

            {/*В настоящее время фома авторизации не является функциональной*/}
            <div className={'output'}>
            </div>

            <div className={"login-html"}>

                <input id="tab-1" type="radio" name="tab" className="sign-in" checked/>
                <label htmlFor="tab-1" className="tab">Войти</label>
                <input id="tab-2" type="radio" name="tab" className="sign-up"/>
                <label htmlFor="tab-2" className="tab">Зарегистрироваться</label>

                <div className="login-form">

                    <div className="sign-in-htm">

                        <label htmlFor="user" className="label">Почта</label>

                        <div className="group">
                            <input id="user" type="text" className="input"/>
                        </div>

                        <label htmlFor="pass" className="label">Пароль</label>

                        <div className="group">
                            <input id="pass" type="password" className="input" data-type="password"/>
                        </div>

                        <div className="group">
                            <input type="submit" className="button" value="Войти"/>
                        </div>

                        <div className="foot-lnk">
                            <a href="#forgot">Забыли пароль?</a>
                        </div>

                        <div className="return">
                            <a href="/">Перейти на главную</a>
                        </div>

                    </div>

                    <div className="sign-up-htm">

                        <label htmlFor="user" className="label">Почта</label>

                        <div className="group">
                            <input id="user" type="text" className="input"/>
                        </div>

                        <label htmlFor="pass" className="label">Пароль</label>

                        <div className="group">
                            <input id="pass" type="password" className="input" data-type="password"/>
                        </div>

                        <label htmlFor="pass" className="label">Повторите пароль</label>

                        <div className="group">
                            <input id="pass" type="password" className="input" data-type="password"/>
                        </div>

                        <div className="group">
                            <input type="submit" className="button" value="Зарегистрироваться"/>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;