import React, {FC} from 'react';
import '../styles/Projects.css'
import {ButtonGroup, createTheme, ThemeProvider, Tooltip} from "@mui/material";
import Button from "@mui/material/Button";
import SettingsIcon from '@mui/icons-material/Settings';
import CodeIcon from '@mui/icons-material/Code';
import DeleteIcon from '@mui/icons-material/Delete';
import ProjectNameField from "./ProjectNameField";
import { useNavigate } from "react-router-dom"

interface i_Project{
    projectName: string;
    projectId: string;
    projectDateLUDT: string;
    deleteProject: (projectId: string) => void;
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffb300'
        },
        secondary: {
            main: '#000000'
        }
    },
});

const Project: FC <i_Project> = ({projectName, projectId, projectDateLUDT, deleteProject}) => {

    const navigate = useNavigate();

    const openProject = () => {
        // navigate("/editor?projectId=" + projectId);
        window.location.href = "/editor?projectId=" + projectId
    }

    return (
        <div className={"paper"}>
            <div className="textcols_left">
                <div className="textcols-item_left">
                    <div className={"projects_name"}>
                        <ProjectNameField projectName={projectName} openProject={openProject}/>
                    </div>
                </div>
                <div className="textcols-item0">
                    <ThemeProvider theme={theme}>
                        <ButtonGroup variant="text" aria-label="text button group">
                            <Tooltip title="Открыть">
                                <Button onClick={openProject} style={{outline: 'none'}}><CodeIcon/></Button>
                            </Tooltip>
                            <Tooltip title="Удалить">
                                <Button
                                    onClick={() => {deleteProject(projectId)}}
                                    style={{outline: 'none'}}
                                >
                                    <DeleteIcon/>
                                </Button>
                            </Tooltip>
                            <Tooltip title="Настройки доступа" style={{outline: 'none'}}>
                                <Button onClick={openProject}><SettingsIcon/></Button>
                            </Tooltip>
                        </ButtonGroup>
                    </ThemeProvider>
                </div>
            </div>

            <div className="textcols_left">
                <div className="textcols-item_left">
                    Описание проекта
                </div>
                <div className="textcols-item_right">
                    <div className={"projects_date"}>
                        Дата редактирования: {projectDateLUDT.toString()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Project;