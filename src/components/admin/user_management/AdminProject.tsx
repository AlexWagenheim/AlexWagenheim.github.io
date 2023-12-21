import React, {FC} from 'react';
import {ButtonGroup, Chip, createTheme, Paper, ThemeProvider, Tooltip} from "@mui/material";
import Button from "@mui/material/Button";
import SettingsIcon from '@mui/icons-material/Settings';
import CodeIcon from '@mui/icons-material/Code';
import DeleteIcon from '@mui/icons-material/Delete';
import ProjectNameField from "../../ProjectNameField";
import anon from "../../../images/anon.png";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate} from "react-router-dom";

interface i_AdminProjecr{
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

const AdminProject: FC <i_AdminProjecr> = ({projectName, projectId, projectDateLUDT, deleteProject}) => {

    const navigate = useNavigate();

    const openProject = () => {
        navigate("/editor?projectId=" + projectId);
        // window.location.href = "/editor?projectId=" + projectId
    }

    return (
        <div style={{width: "100%"}}>
            <ThemeProvider theme={theme}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 120,
                        minWidth: 300
                    }}
                >
                    <div>
                        <div className="row align-items-start">
                            <div className="col" style={{minWidth: 365}}>
                                <ProjectNameField projectName={projectName} openProject={openProject}/>
                                <div><b>Последнее изменение:</b> {projectDateLUDT}</div>
                            </div>
                            <div className="col" style={{minWidth: 150}}>
                                <div className="float-right">
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
                        </div>
                    </div>
                </Paper>
            </ThemeProvider>
        </div>
    );
};

export default AdminProject;