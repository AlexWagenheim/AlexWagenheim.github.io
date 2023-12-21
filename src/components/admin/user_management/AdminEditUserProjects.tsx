import React, {FC, useEffect, useState} from 'react';
import ProjectList from "../../ProjectList";
import {ProjectInfo} from "../../../entity/project/ProjectInfo";
import Requests from "../../../services/Requests";
import {AxiosError} from "axios";
import ProjectList2 from "./ProjectList2";
import UserSearch from "../UserSearch";
import {createTheme, ThemeProvider} from "@mui/material";

interface i_AdminEditUserProjects{
    userId: string
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000'
        },
        secondary: {
            main: '#000000'
        }
    },
});

const AdminEditUserProjects:FC<i_AdminEditUserProjects> = ({userId}) => {

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
    }, [userId])

    return (
        <div>
            <ThemeProvider theme={theme}>
                <div style={{marginTop: 20, marginBottom: 10}}>
                    <UserSearch update={fetching}/>
                </div>
            </ThemeProvider>

            {
                projects.length === 0 ?
                    <div>
                        <p>Список проектов пуст</p>
                    </div>
                    :
                    <div>
                        <ProjectList2 items={projects} isLoading={isLoading} deleteProject={deleteProject}/>
                    </div>
            }
        </div>
    );
};

export default AdminEditUserProjects;