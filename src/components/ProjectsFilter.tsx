import React, {useEffect, useState} from 'react';
import {ResourceOwner} from "../entity/user/ResourceOwner";
import Requests from "../services/Requests";
import {AxiosError} from "axios/index";
import Loader from "./Loader";
import Projects from "../pages/Projects";
import {useNavigate} from "react-router-dom";

const ProjectsFilter = () => {

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
                });
        }, []
    )

    return (
        <div>
            {!isLoading ? <div>
                <Projects userId={userLocal.id}/>
            </div> : <Loader/>}
        </div>
    );
};

export default ProjectsFilter;