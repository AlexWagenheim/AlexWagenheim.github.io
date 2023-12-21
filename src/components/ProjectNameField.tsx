import React, {FC, useState} from 'react';
import {createTheme, IconButton, ThemeProvider, Tooltip} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DoneIcon from '@mui/icons-material/Done';

interface i_ProjectNameField{
    projectName: string;
    openProject: () => void;
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

const ProjectNameField: FC <i_ProjectNameField> = ({projectName, openProject}) => {

    const [isOk, setIsOk] = useState<boolean>(true);

    const [value, setValue] = useState(projectName);

    return (
        <div>
            {isOk ?
            <div>
                <div className={"projects_name"}>
                    <p onClick={openProject} style={{outline: 'none'}}>
                        {/*<h4 className="d-inline-block text-truncate" style={{maxWidth: 100}}>{projectName}</h4>*/}
                        {projectName}
                    </p>
                    <ThemeProvider theme={theme}>
                        <Tooltip title="Изменить">
                            <IconButton
                                onClick={() => {setIsOk(false)}}
                                style={{outline: 'none'}}
                                size={"small"}
                                sx={{
                                    padding: '20px',
                                    marginBottom: '11px',
                                    borderRadius: '0px'
                                }}
                                color={"primary"}
                            ><CreateIcon
                                sx={{
                                padding: '0px',
                                margin: '-20px'
                                }}
                                color={"primary"}
                            /></IconButton>
                        </Tooltip>
                    </ThemeProvider>
                </div>
            </div>
                : <div>
                    <div className={"projects_name_change"}>
                        <input
                            className={"bottom_input"}
                            value={value}
                            style={{outline: 'none'}}
                            onChange={e => setValue(e.target.value)}
                        />
                        <ThemeProvider theme={theme}>
                            <Tooltip title="Сохранить">
                                <IconButton
                                    onClick={() => {setIsOk(true)}}
                                    style={{outline: 'none'}}
                                    size={"small"}
                                    sx={{
                                        padding: '20px',
                                        margin: '5px',
                                        borderRadius: '0px'
                                    }}
                                    color={"primary"}
                                ><DoneIcon
                                    sx={{
                                        padding: '0px',
                                        margin: '-20px'
                                    }}
                                    color={"primary"}
                                /></IconButton>
                            </Tooltip>
                        </ThemeProvider>
                    </div>
                </div>
            }
        </div>
    );
};

export default ProjectNameField;