import React, {FC} from 'react';
import '../styles/TopBar.css';
import play from '../images/play.png';
import play_m from '../images/play_m2.gif';
import {useNavigate} from "react-router-dom";
import LoginService from "../services/LoginService";
import save from '../images/save.png';
import save_m from '../images/save_m.gif';
import logo_black from '../images/Logo_black.png';
import {Tooltip} from "@mui/material";


interface i_TopBar_editor {
    updateProject: () => void,
    compileAndRunProject: () => void,
    projectName: string
}

const TopBarEditor: FC <i_TopBar_editor> = ({
                                 updateProject,
                                 projectName,
                                 compileAndRunProject}) => {

    const navigate = useNavigate();
    const main = () => {
        navigate("/");
    }


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
                            <button className={"a_btn_ex"} onClick={
                                () => {LoginService.login()}
                            }>Вход</button>
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

export default TopBarEditor;