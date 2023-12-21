import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ResourceOwner} from "../entity/user/ResourceOwner";
import Requests from "../services/Requests";
import {AxiosError} from "axios";
import Profile from "../pages/Profile";
import LoaderProjects from "./LoaderProjects";

const ProfileFilter = () => {

    const navigate = useNavigate();

    const [userLocal, setUserLocal] = useState<ResourceOwner>({} as ResourceOwner);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
            Requests.getUserInfo()
                .then((response) => {
                    console.log(response.data);
                    setUserLocal(response.data);
                    setIsLoading(false)
                })
                .catch((error: AxiosError) => {
                    console.log(error.status);
                    console.log(error);
                    navigate('/');
                    setIsLoading(false);
                });
        }, []
    )

    return (
        <div>
            <Profile user={userLocal} isLoading={isLoading}/>
        </div>
    );
};

export default ProfileFilter;