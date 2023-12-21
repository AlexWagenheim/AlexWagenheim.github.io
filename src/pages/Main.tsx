import React, {useEffect, useState} from 'react';
import '../styles/Main.css';
import logo_black from '../images/Logo_black.png';
import {useNavigate} from "react-router-dom";
import LoginService from "../services/LoginService";
import {ResourceOwner} from "../entity/user/ResourceOwner";
import Requests from "../services/Requests";
import {AxiosError} from "axios";

const Main = () => {

    const navigate = useNavigate();
    const editor = () => {
        // navigate("/editor");
        window.location.href = "/editor";
    }
    const about_project = () => {
        navigate("/about_project");
    }
    const about_developers = () => {
        navigate("/about_developers");
    }

    const [userLocal, setUserLocal] = useState<ResourceOwner>(
        new ResourceOwner('',
            new Date(), new Date(),
            '', '', '',
            new Date(), '', 'anonymous', '', [], true
        ))

    useEffect(() => {
            Requests.getUserInfo()
                .then((response) => {
                    console.log(response.data);
                    setUserLocal(response.data);
                })
                .catch((error: AxiosError) => {
                    console.log(error.status);
                    console.log(error);
                    navigate('/');
                    setUserLocal(new ResourceOwner('', new Date(), new Date(),
                        '', '', '',
                        new Date(), '', 'anonymous', '', [], true
                    ))
                });
        }, []
    )

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
            {/*Основная часть*/}
            <div className={"glass"}>
                <header className="header">
                    <img className="logo" src={logo_black} width="70" alt={"logo"}/>
                    <nav className="nav-items">
                        <button className={"a_btn"} onClick={about_project}>О проекте</button>
                        <button className={"a_btn"} onClick={about_developers}>О разработчиках</button>
                        {userLocal.id === '' ?
                            <button className={"a_btn"} onClick={() => {
                                LoginService.login()
                            }}>Вход</button>
                            : null
                        }

                    </nav>
                </header>
                <div className={"intro"}>
                    <h1>ОБЕРОН-2</h1>
                    <p>Онлайн-компилятор</p>
                    <button className={"btn"} onClick={editor}>НАЧАТЬ</button>
                </div>
            </div>
        </div>
    );
};

export default Main;