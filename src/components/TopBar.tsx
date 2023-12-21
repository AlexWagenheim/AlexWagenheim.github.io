import React, {FC} from 'react';
import '../styles/TopBar.css';
import lines_m from "../images/3lines_m.gif";
import {useNavigate} from "react-router-dom";
import LoginService from "../services/LoginService";
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import {Box, ButtonGroup, createTheme, ThemeProvider, Tooltip} from "@mui/material";
import Button from "@mui/material/Button";
import TuneIcon from "@mui/icons-material/Tune";

interface i_TopBar{
    location: string
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#FFFFFF'
        },
        secondary: {
            main: '#ffb300'
        }
    },
});

const TopBar: FC <i_TopBar> = ({location}) => {

    const navigate = useNavigate();
    const editor = () => {
        navigate("/editor");
    }
    const profile = () => {
        navigate("/profile");
    }
    const projects = () => {
        navigate("/projects");
    }
    const friends = () => {
        navigate("/friends");
    }
    const notifications = () => {
        navigate("/notifications");
    }

    const logout = () => {
        LoginService.logout();
    }

    return (
        <div>
        {
            location === '/projects' ?
            <div className={"base"}>
                <div>
                    <div className={"menu_center"}>
                        <ThemeProvider theme={theme}>

                            <Box
                                component="form"
                                sx={{
                                    display: 'inline',
                                    '& > :not(style)': { m: 0.65, width: '35ch'},
                                    height: '20px',
                                    size: 'small'
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField label="Поиск"
                                           variant="outlined"
                                           size={"small"}
                                />
                            </Box>

                            <ButtonGroup
                                variant="text"
                                aria-label="text button group"
                                sx={{
                                    marginTop: '7px'
                                }}
                            >
                                <Tooltip title="Найти">
                                    <Button style={{outline: 'none'}}><SearchIcon/></Button>
                                </Tooltip>
                                <Tooltip title="Фильтр">
                                    <Button
                                        style={{outline: 'none'}}
                                    >
                                        <TuneIcon/>
                                    </Button>
                                </Tooltip>
                            </ButtonGroup>
                        </ThemeProvider>
                    </div>
                    <nav className="three">
                        <ul className="topmenu">

                            <li>
                                <img src={lines_m} width={"35px"} style={{marginLeft: "10px", marginTop: "10px", border: 0}} className={"menu_img"} alt={"lines"}/>
                                <i className="fa fa-angle-down"></i>
                                <ul className="submenu">
                                    <button className={"a_btn_e"} onClick={editor}><li>
                                        Редактор
                                    </li></button>
                                    <button className={"a_btn_e"} color={"F3f3f3"} onClick={profile}> <li>
                                        Профиль
                                    </li></button>
                                    <button className={"a_btn_e_a"} onClick={projects}><li>
                                        Проекты
                                    </li></button>
                                    <button className={"a_btn_e"} color={"F3f3f3"} onClick={friends}> <li>
                                        Друзья
                                    </li></button>
                                    <button className={"a_btn_e"} color={"F3f3f3"} onClick={notifications}> <li>
                                        Уведомления
                                    </li></button>
                                    <button className={"a_btn_e"} onClick={logout}><li>
                                        Выйти
                                    </li></button>

                                </ul>
                            </li>
                        </ul>
                    </nav>

                </div>
            </div>
        :
            <div className={"base"}>
                <div>
                    <nav className="three">
                        <ul className="topmenu">
                            <li>
                                <img src={lines_m} width={"35px"} style={{marginLeft: "10px", marginTop: "10px", border: 0}} className={"menu_img"} alt={"lines"}/>
                                <i className="fa fa-angle-down"></i>
                                <ul className="submenu">
                                    <button className={"a_btn_e"} onClick={editor}><li>
                                        Редактор
                                    </li></button>
                                    {
                                        location === '/profile' ?
                                            <button className={"a_btn_e_a"} onClick={profile}><li>
                                                Профиль
                                            </li></button>
                                            :
                                            <button className={"a_btn_e"} color={"F3f3f3"} onClick={profile}> <li>
                                                Профиль
                                            </li></button>
                                    }
                                    <button className={"a_btn_e"} color={"F3f3f3"} onClick={projects}> <li>
                                        Проекты
                                    </li></button>
                                    {
                                        location === '/friends' ?
                                            <button className={"a_btn_e_a"} onClick={friends}><li>
                                                Друзья
                                            </li></button>
                                            :
                                            <button className={"a_btn_e"} color={"F3f3f3"} onClick={friends}> <li>
                                                Друзья
                                            </li></button>
                                    }
                                    {
                                        location === '/notifications' ?
                                            <button className={"a_btn_e_a"} onClick={notifications}><li>
                                                Уведомления
                                            </li></button>
                                            :
                                            <button className={"a_btn_e"} color={"F3f3f3"} onClick={notifications}> <li>
                                                Уведомления
                                            </li></button>
                                    }
                                    <button className={"a_btn_e"} onClick={logout}><li>
                                        Выйти
                                    </li></button>

                                </ul>
                            </li>
                        </ul>
                    </nav>

                </div>
            </div>
        }
        </div>
    );
};

export default TopBar;