import React, {FC, useEffect, useState} from 'react';
import Editor from "../pages/Editor";
import {CompatClient} from "@stomp/stompjs/esm6";
import {ResourceOwner} from "../entity/user/ResourceOwner";
import Requests from "../services/Requests";
import {AxiosError} from "axios";
import Loader from "./Loader";

interface i_EditorFilter {
    stompClient: CompatClient;
    user: ResourceOwner;
    subscribes: string[];
    setSubscribes: (data: string[]) => void;
}

const EditorFilter: FC <i_EditorFilter> = ({stompClient, user,
                                               subscribes, setSubscribes}) => {

    const params = new URLSearchParams(window.location.search);
    const param = params.get('projectId');
    params.delete('projectId');

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
                    setUserLocal(response.data);
                    setIsLoading(false)
                    console.log('id = '+ user.id)
                })
                .catch((error: AxiosError) => {
                    console.log(error.status)
                    console.log(error)
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
            <Editor stompClient={stompClient}
                    user={userLocal}
                    projectId={param != null ? param : ''}
                    subscribes={subscribes}
                    setSubscribes={setSubscribes}
            />
            </div> : <Loader/>}
        </div>
    );
};

export default EditorFilter;