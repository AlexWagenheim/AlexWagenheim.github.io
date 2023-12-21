import React, {FC, useEffect, useState} from 'react';
import "../styles/Projects.css";
import TopBar from "../components/TopBar";
import Requests from "../services/Requests";
import {ProjectInfo} from "../entity/project/ProjectInfo";
import ProjectList from "../components/ProjectList";
import {AxiosError} from "axios";
import add_m from "../images/add_project.gif";
import {Tooltip} from "@mui/material";
import {useLocation} from "react-router-dom";

interface i_Projects{
    userId: string
}

const Projects: FC <i_Projects> = ({ userId}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [projects, setProjects] = useState<ProjectInfo[]>([] as ProjectInfo[]) ;

    const [projectName, setProjectName] = useState<string>('') ;

    const creating = async (projectName: string) => {
        setIsLoading(true);
        await Requests.creatingProject(userId, projectName)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error: AxiosError) => {
                console.log(error)
            });
        await updating();
        setProjectName('');
    }

    const deleteProject = async (projectId: string) => {
        setIsLoading(true);
        await Requests.deletingProject(userId, projectId)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error: AxiosError) => {
                console.log(error)
            });
        await updating();
    }

    const updating = async () => {
        console.log('update')
        await Requests.getAllProject(userId)
            .then((response) => {
                console.log(response.data);
                setProjects(response.data);
            })
            .catch((error: AxiosError) => {
                console.log(error)
            });
        setIsLoading(false)
    }

    const fetching = async () => {
        setIsLoading(true);
        await Requests.getAllProject(userId)
            .then((response) => {
                console.log(response.data);
                setProjects(response.data);
            })
            .catch((error: AxiosError) => {
                console.log(error.status)
                console.log(error)
                });

        setIsLoading(false);
    }

    useEffect(() => {
        fetching();
    }, [])

    const location = useLocation().pathname;

    return (
        <div>
            <TopBar
                location={location}
            />
            <Tooltip title="Добавить">
                <button className={"btn_icon_add"} onClick={() => {creating('Новый проект')}} style={{outline: "none"}}>
                    <img src={add_m} width={"40px"} alt={"add"}/> </button>
            </Tooltip>
            {
                projects.length === 0 ?
                    <div className={"list_projects"}>
                        <p>Список проектов пуст</p>
                    </div>
                    :
                    <div>
                        <ProjectList items={projects} isLoading={isLoading} deleteProject={deleteProject}/>
                    </div>
            }
        </div>
    );
};

export default Projects;