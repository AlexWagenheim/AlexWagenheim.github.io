import React, {FC, useEffect, useState} from 'react';
import {MuiTabs} from '../components/MuiTabs';
import {CompatClient, StompSubscription} from "@stomp/stompjs";
import {ProjectManagerResponse} from "../entity/project/dto/ProjectManagerResponse";
import {ResponseEntity} from "../entity/ResponseEntity";
import {HttpStatusCode} from "axios";
import {CompilerResponse} from "../entity/compiling/dto/CompilerResponse";
import {ProjectModule} from "../entity/project/ProjectModule";
import {WebSocketFieldErrors} from "../entity/WebSocketFieldErrors";
import {UpdateProjectRequest} from "../entity/project/dto/UpdateProjectRequest";
import {OpenProjectWebSocketRequest} from "../entity/project/dto/OpenProjectWebSocketRequest";
import {ProjectManagerResponseStatus} from "../entity/project/dto/ProjectManagerResponseStatus";
import Loader from "../components/Loader";
import {CompilerMessage} from "../entity/compiling/dto/CompilerMessage";
import {OutTabs} from "../components/OutTabs";
import {ProjectRunMode} from "../entity/execute/dto/ProjectRunMode";
import {ExecutorResponse} from "../entity/execute/dto/ExecutorResponse";
import {StatusCode} from "../entity/compiling/dto/StatusCode";
import {CompileAndRunProjectRequest} from "../entity/CompileAndRunProjectRequest";
import {WorkspaceCredentials} from "../entity/WorkspaceCredentials";
import TopBarEditorAuthorization from "../components/TopBarEditorAuthorization";
import {ResourceOwner} from "../entity/user/ResourceOwner";
import TopBarEditor from "../components/TopBarEditor";
import {useLocation} from "react-router-dom";

const ACCESS_TOKEN_KEY = "access_token";

interface i_Editor {
    stompClient: CompatClient;
    user: ResourceOwner;
    projectId: string;
    subscribes: string[];
    setSubscribes: (data: string[]) => void;
}



const Editor: FC <i_Editor> = ({stompClient, user, projectId,
                                   subscribes, setSubscribes}) => {

    const token = sessionStorage.getItem(ACCESS_TOKEN_KEY);

    const [value, setValue] = useState('0');

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [isLoadingSave, setIsLoadingSave] = useState<boolean>(false);

    const [isLoadingCompile, setIsLoadingCompile] = useState<boolean>(false);

    const [isLoadingExecute, setIsLoadingExecute] = useState<boolean>(false);

    const [projectName, setProjectName] = useState<string>('');

    const [projectModules, setProjectModules] = useState<ProjectModule[]>([]);

    const [projectNameErrors, setProjectNameErrors] = useState<string[]>([]);

    const [compilerMessages, setCompilerMessages] = useState<CompilerMessage[]>([]);

    const [compilerStatusCode, setCompilerStatusCode] = useState<string>('');

    const [executeStatusCode, setExecuteStatusCode] = useState<string>('');

    const [executorOutput, setExecutorOutput] = useState<string>('');

    const [executorInput, setExecutorInput] = useState<string>('');

    let localSubscribes: StompSubscription[] = [];

    //Начальное открытие редактора
    const openEditor = () => {
        //Отправка запроса с id проекта
        stompClient.send("/app/editor/open", {'Authorization': window.sessionStorage.getItem(ACCESS_TOKEN_KEY)}, JSON.stringify(new OpenProjectWebSocketRequest(
            projectId,
            new WorkspaceCredentials (localStorage.getItem('workspaceId'), localStorage.getItem('workspaceSecret'))
        )));
    }

    //Начальное открытие редактора
    const initWorkspace = () => {
        console.log(new WorkspaceCredentials(
            localStorage.getItem('workspaceId'), localStorage.getItem('workspaceSecret')));
        //Отправка запроса с WorkspaceCredentials
        stompClient.send("/app/editor/init", {'Authorization': window.sessionStorage.getItem(ACCESS_TOKEN_KEY)}, JSON.stringify(new WorkspaceCredentials(
            localStorage.getItem('workspaceId'), localStorage.getItem('workspaceSecret')
        )));
    }

    //Обновить проект
    const updateProject = () => {

        setIsLoadingSave(true);

        stompClient.send("/app/editor/update", {'Authorization': window.sessionStorage.getItem(ACCESS_TOKEN_KEY)}, JSON.stringify(new UpdateProjectRequest(
            new WorkspaceCredentials (localStorage.getItem('workspaceId'), localStorage.getItem('workspaceSecret')),
            projectName,
            projectModules,
            true
        )));
    }

    const editorProjectHandler = (response: ResponseEntity<ProjectManagerResponse>) => {

        if (response.body.status === ProjectManagerResponseStatus.PROJECT_OPENED) {
            //Информация о загрузке файлов
            setIsLoading(false);
            setProjectName(response.body.project.name);
            setProjectModules(response.body.project.modules);
        }
        else if (response.body.status === ProjectManagerResponseStatus.PROJECT_UPDATED){
            console.log(response.body.project);
            setProjectModules(response.body.project.modules);
            setProjectName(response.body.project.name);
        }
        setIsLoadingSave(false);
    }

    //Откомпилировать и запустить проект
    const compileAndRunProject = () => {

        setIsLoadingSave(true);
        setIsLoadingCompile(true);
        setIsLoadingExecute(true);

        setExecutorOutput("");
        setCompilerMessages([]);

        //Если проект откомпилирован, переход к запуску
        stompClient.send("/app/editor/run", {'Authorization': window.sessionStorage.getItem(ACCESS_TOKEN_KEY)}, JSON.stringify(new CompileAndRunProjectRequest(
            new WorkspaceCredentials (localStorage.getItem('workspaceId'), localStorage.getItem('workspaceSecret')),
            projectName,
            "123", // Парольную фразу нужно забирать из локального хранилища
            ProjectRunMode.INSTANT,
            executorInput,
            projectModules
        )));
    }

    //Создать новый модуль
    const createModule = (name: string, body: string) => {
        let array: ProjectModule[] = Array.from(projectModules);
        array.push(new ProjectModule(name, body));
        setProjectModules(array);
    }

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const initEditor = async () => {

        let access_token: string = "";

        if (token != null) {
            access_token = token;
        }

        while (!stompClient.connected) {
            await sleep(100);
        }

        let appEditorSubscribe = stompClient.subscribe('/app/editor', function (message) {

            let userEditorInitSubscribe = stompClient.subscribe('/user/' + message.body + '/editor/init',
                function (message){
                let response: ResponseEntity<WorkspaceCredentials> = JSON.parse(message.body);
                console.log(message.body);
                if (response.statusCodeValue === HttpStatusCode.Ok){
                    localStorage.setItem('workspaceId',
                        (response.body.workspaceId != null) ? response.body.workspaceId : '');
                    localStorage.setItem('workspaceSecret',
                        (response.body.secret != null) ? response.body.secret : '');
                    openEditor();
                }
            }, {'Authorization': access_token});

            localSubscribes.push(userEditorInitSubscribe);

            initWorkspace();

            //Получение информации при загрузке редактора
            let userEditorProjectSubscribe = stompClient.subscribe('/user/' + message.body + '/editor/project',
                function (message){
                let response: ResponseEntity<ProjectManagerResponse> = JSON.parse(message.body);
                if (response.statusCodeValue === HttpStatusCode.Ok) {
                    console.log(message.body);
                    editorProjectHandler(response);
                }
            }, {'Authorization': access_token});

            localSubscribes.push(userEditorProjectSubscribe);

            let userEditorErrorSubscribe = stompClient.subscribe('/user/' + message.body + '/editor/error',
                function (message) {
                let response: ResponseEntity<WebSocketFieldErrors> = JSON.parse(message.body);
                let array: string[] = response.body.errors
                    .filter(value => value.fieldName === "name")
                    .map(value => value.error);
                setProjectNameErrors(array);
            }, {'Authorization': access_token});

            localSubscribes.push(userEditorErrorSubscribe);

            let userEditorCompileSubscribe = stompClient.subscribe('/user/' + message.body + '/editor/compile',
                function (message) {
                let response: ResponseEntity<CompilerResponse> = JSON.parse(message.body);
                if (response.statusCodeValue === HttpStatusCode.Ok) {
                    console.log(response.body);
                    setCompilerMessages(response.body.messages);
                    setCompilerStatusCode(response.body.statusCode);
                    setIsLoadingCompile(false);
                    setValue('2');
                }
            }, {'Authorization': access_token});

            localSubscribes.push(userEditorCompileSubscribe);

            let userEditorExecuteSubscribe = stompClient.subscribe('/user/' + message.body + '/editor/execute',
                function (message) {
                let response: ResponseEntity<ExecutorResponse> = JSON.parse(message.body);

                if (response.statusCodeValue === HttpStatusCode.Ok) {
                    console.log(response.body);
                    setExecuteStatusCode(response.body.statusCode);
                    if (response.body.statusCode === StatusCode.SUCCESSFUL_EXECUTION){
                        setExecutorOutput(response.body.output);
                        setValue('1');
                    }
                    else if (response.body.statusCode === StatusCode.FAILED_COMPILATION){
                        setValue('2');
                        setExecutorOutput(response.body.error);
                    }
                    else {
                        setExecutorOutput(response.body.message)
                    }

                }
                setIsLoadingExecute(false);

            }, {'Authorization': access_token});

            localSubscribes.push(userEditorExecuteSubscribe);

            let userEditorSubscribe = stompClient.subscribe('/user/' + message.body + '/editor',
                function (message) {
                let response: ResponseEntity<ProjectManagerResponse> = JSON.parse(message.body);
                if (response.statusCodeValue === HttpStatusCode.Created) {
                }
            }, {'Authorization': access_token});

            localSubscribes.push(userEditorSubscribe);

        }, {'Authorization': access_token});

        localSubscribes.push(appEditorSubscribe);

        setSubscribes(localSubscribes.map(value => value.id));
    }


    useEffect( () => {
        initEditor();
    }, [] );


    const location = useLocation().pathname;

    return (
        <div>
            {!isLoading ? <div>
                {user.id !== '' ? <div>
                    {/*Авторизованные пользователи*/}
                    <TopBarEditorAuthorization
                        updateProject={updateProject}
                        projectName={projectName}
                        compileAndRunProject={compileAndRunProject}
                        user={user}
                        location={location}
                    />
                    <MuiTabs
                        createModules={createModule}
                        modules={projectModules}
                        setModules={setProjectModules}
                        isLoadingSave={isLoadingSave}
                        isLoadingCompile={isLoadingCompile}
                        isLoadingExecute={isLoadingExecute}
                    />

                    <OutTabs
                        CM={compilerMessages}
                        compilerStatusCode={compilerStatusCode}
                        executorOutput={executorOutput}
                        executorInput={executorInput}
                        setExecutorInput={setExecutorInput}
                        value={value}
                        setValue={setValue}
                    />
                </div> : <div>
                    {/*Неавторизованные пользователи*/}
                    <TopBarEditor
                        updateProject={updateProject}
                        projectName={projectName}
                        compileAndRunProject={compileAndRunProject}
                    />
                    <MuiTabs
                        createModules={createModule}
                        modules={projectModules}
                        setModules={setProjectModules}
                        isLoadingSave={isLoadingSave}
                        isLoadingCompile={isLoadingCompile}
                        isLoadingExecute={isLoadingExecute}
                    />
                    <OutTabs
                        CM={compilerMessages}
                        compilerStatusCode={compilerStatusCode}
                        executorOutput={executorOutput}
                        executorInput={executorInput}
                        setExecutorInput={setExecutorInput}
                        value={value}
                        setValue={setValue}
                    />
                </div>}

            </div> : <div>
                <Loader/>
            </div>
            }
        </div>
    );
};

export default Editor;