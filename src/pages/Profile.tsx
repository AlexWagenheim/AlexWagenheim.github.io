import React, {FC, useEffect, useState} from 'react';
import '../styles/Profile.css'
import TopBar from "../components/TopBar";
import {ResourceOwner} from "../entity/user/ResourceOwner";
import {useLocation, useNavigate} from "react-router-dom";
import Loader from "../components/Loader";
import anon from "../images/anon.png";
import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from "@mui/material";

interface i_Profile{
    user: ResourceOwner
    isLoading: boolean;
}

const Profile: FC <i_Profile> = ({user, isLoading}) => {

    const navigate = useNavigate();

    // const [userLocal, setUserLocal] = useState<ResourceOwner>({} as ResourceOwner);

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

    const location = useLocation().pathname;

    return (
        <div>
            {!isLoading ? <div>
                    <TopBar
                    location={location}
                    />
                    <div className={'user_info'}>
                        <div className={'user_name'}>
                            <h3>{user.username}</h3>
                        </div>
                        <div className={'user_data'}>
                            <p>Проекты: </p>
                            <p>Друзья: </p>
                        </div>
                        <div>
                            <ThemeProvider theme={theme}>
                                <Button variant="outlined"
                                        color="primary"
                                        style={{outline: 'none'}}
                                >РЕДАКТИРОВАТЬ</Button>
                            </ThemeProvider>
                        </div>
                    </div>
                {/*Фото профиля*/}
                <div className={'circle'}>
                {
                    user.avatarUrl !== '' ?
                        <img src={user.avatarUrl} className={"photo"} alt={"photo_user"}/>
                        :
                        <img src={anon} className={"photo"} alt={"photo_anon"}/>
                }
                </div>

            </div> : <Loader/>}
        </div>
    );
};

export default Profile;