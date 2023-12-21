import React, {FC, useEffect} from 'react';
import '../styles/TopBar.css';
import lines_m from "../images/3lines_m.gif";
import play from '../images/play.png';
import play_m from '../images/play_m2.gif';
import {useNavigate} from "react-router-dom";
import LoginService from "../services/LoginService";
import save from "../images/save.png";
import save_m from "../images/save_m.gif";
import {ResourceOwner} from "../entity/user/ResourceOwner";
import {Tooltip} from "@mui/material";
import logo_black from "../images/Logo_black.png";

interface i_TopBarEditorAuthorization{
    updateProject: () => void,
    compileAndRunProject: () => void,
    projectName: string,
    user: ResourceOwner,
    location: string
}

const TopBarEditorAuthorization: FC <i_TopBarEditorAuthorization> = ({updateProject,
                                 projectName,
                                 compileAndRunProject,
                                 user, location}) => {

    const navigate = useNavigate();
    const editor = () => {
        // navigate("/editor");
        window.location.href = "/editor";
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
    const main = () => {
        navigate("/");
    }

    useEffect(() => {
        console.log(user);
        }
        ,[]
    )

    return (
        <div className={"base"}>
            <div>
                <nav className="three">
                    <ul className="topmenu">
                        <Tooltip title="Запустить">
                            <li><button className={"btn_icon"} onClick={compileAndRunProject} style={{outline: "none"}}>
                                <img src={play} width={"35px"} className={"image1"} alt={"play"}/>
                                <img src={play_m} width={"35px"} className={"image2"} alt={"play_m"}/></button></li>
                        </Tooltip>

                        <Tooltip title="Сохранить">
                            <li><button className={"btn_icon"} onClick={updateProject} style={{outline: "none"}}>
                                <img src={save} width={"35px"} className={"image1"} alt={"save"}/>
                                <img src={save_m} width={"35px"} className={"image2"} alt={"save_m"}/></button></li>
                        </Tooltip>
                        <li>
                            <img src={lines_m}
                                 width={"35px"}
                                 style={{marginLeft: "10px", border: 0}}
                                 className={"menu_img"}
                                 alt={"lines"}/>
                            <i className="fa fa-angle-down"></i>
                            <ul className="submenu">
                                <button className={"a_btn_e_a"} onClick={editor}><li>
                                    Редактор
                                </li></button>
                                <button className={"a_btn_e"} onClick={profile}><li>
                                    Профиль
                                </li></button>
                                <button className={"a_btn_e"} onClick={projects}><li>
                                    Проекты
                                </li></button>
                                <button className={"a_btn_e"} onClick={friends}><li>
                                    Друзья
                                </li></button>
                                <button className={"a_btn_e"} onClick={notifications}><li>
                                    Уведомления
                                </li></button>
                                <button className={"a_btn_e"} onClick={logout}><li>
                                    Выйти
                                </li></button>
                            </ul>
                        </li>
                    </ul>
                </nav>


                <div className={"project_name"}>
                    <img src={logo_black}
                         width={"35px"}
                         style={{marginRight: "25px"}}
                         className={"logo"}
                         onClick={main}
                        alt={"logo_black"}
                    />
                    {projectName}
                </div>
            </div>
        </div>
    );
};

export default TopBarEditorAuthorization;