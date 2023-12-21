import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "./pages/Main";
import AboutDevelopers from "./pages/AboutDevelopers";
import AboutProject from "./pages/AboutProject";
import Login from "./pages/Login";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import InterceptCodePage from "./pages/InterceptCodePage";
import UserNotFound from "./errors/UserNotFound";
import InternalError from "./errors/InternalError";
import Requests from "./services/Requests";
import {ResourceOwner} from "./entity/user/ResourceOwner";
import Loader from "./components/Loader";
import {AxiosError} from "axios/index";
import EditorFilter from "./components/EditorFilter";
import ProjectsFilter from "./components/ProjectsFilter";
import ProfileFilter from "./components/ProfileFilter";
import ConsoleFilter from "./components/admin/ConsoleFilter";
import LoginService from "./services/LoginService";

const serverUrl = process.env.REACT_APP_COMPILER_URL;
const ACCESS_TOKEN_KEY = "access_token";

const sock = new SockJS(serverUrl + '/ws');
let stompClient = Stomp.over(sock);

const token = window.sessionStorage.getItem(ACCESS_TOKEN_KEY);

stompClient.connect({'Authorization': token}, function (frame: string) {
    console.log("Подключение к серверу прошло успешно!");
});

sock.onopen = function() {
    console.log('open');
}

const App = () => {

    const [subscribes, setSubscribes] = useState<string[]>([] as string[]);
    const [editorReady, setEditorReady] = useState<boolean>(false);

    const [user, setUser] = useState<ResourceOwner>(
        new ResourceOwner('',
        new Date(), new Date(),
        '', '', '',
        new Date(), '', 'anonymous', '', [], true
    ))

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        LoginService.updateTokens()
            .then(() => {
                Requests.getUserInfo()
                    .then((response) => {
                        console.log(response.data);
                        setUser(response.data);
                        setIsLoading(false)
                    })
                    .catch((error: AxiosError) => {
                        console.log(error.status)
                        console.log(error)
                        setIsLoading(false)
                        setUser(new ResourceOwner('', new Date(), new Date(),
                            '', '', '',
                            new Date(), '', 'anonymous', '', [], true
                        ))
                    });
            });
        },
        [])

    return (
        !isLoading ?
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Main/>}/>
                    <Route path={"/about_project"} element={<AboutProject/>}/>
                    <Route path={"/about_developers"} element={<AboutDevelopers/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/editor"}
                           element={
                               <EditorFilter
                                   stompClient={stompClient}
                                   user={user}
                                   subscribes={subscribes}
                                   setSubscribes={setSubscribes}
                               />
                           }
                    />
                    <Route path={"/console"}  element={<ConsoleFilter stompClient={stompClient} user={user}/>}/>
                    <Route path={"/profile"} element={<ProfileFilter/>}/>
                    <Route path={"/projects"} element={<ProjectsFilter/>}/>
                    <Route path={"/code"} element={<InterceptCodePage/>}/>
                    <Route path={"/400"} element={<UserNotFound/>}/>
                    <Route path={"/500"} element={<InternalError/>}/>
                </Routes>
            </BrowserRouter>
         : <Loader/>
    );
}

export default App;
