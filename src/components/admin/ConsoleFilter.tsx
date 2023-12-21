import React, {FC, useEffect, useState} from 'react';
import {CompatClient} from "@stomp/stompjs/esm6";
import {ResourceOwner} from "../../entity/user/ResourceOwner";
import Requests from "../../services/Requests";
import {AxiosError} from "axios/index";
import Console from "../../pages/Console";
import Loader from "../Loader";
import {useNavigate} from "react-router-dom";

interface i_ConsoleFilter {
    stompClient: CompatClient;
    user: ResourceOwner;
}

const ConsoleFilter: FC <i_ConsoleFilter> = ({stompClient, user}) => {

    const navigate = useNavigate();

    const [userLocal, setUserLocal] = useState<ResourceOwner>(
        new ResourceOwner('',
            new Date(), new Date(),
            '', '', '',
            new Date(), '', 'anonymous', '',[], true
        ))

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
            Requests.getUserInfo()
                .then((response) => {
                    console.log(response.data);
                    if (response.data.roles.filter(value => value === 'ROLE_ADMIN').length === 0){
                        navigate("/")
                    }
                    else {
                        setUserLocal(response.data);
                        setIsLoading(false);
                    }

                })
                .catch((error: AxiosError) => {
                    console.log(error.status);
                    console.log(error);
                    navigate('/');
                    setIsLoading(false)
                    setUserLocal(new ResourceOwner('', new Date(), new Date(),
                        '', '', '',
                        new Date(), '', 'anonymous', '',[], true
                    ))
                });
        }, []
    )

    return (
        <div>
            {!isLoading ? <div>
                <Console stompClient={stompClient}
                        user={userLocal}/>
            </div> : <Loader/>}
        </div>
    );
};

export default ConsoleFilter;