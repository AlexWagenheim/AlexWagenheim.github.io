import React, {useEffect} from 'react';
import LoginService from "../services/LoginService";
import {useNavigate} from "react-router";
import {useSearchParams} from "react-router-dom";

const InterceptCodePage = () => {

    const [queryParameters] = useSearchParams()
    const code: string | null = queryParameters.get("code");
    const router = useNavigate();

    useEffect(() => {
        console.log("Code: " + code)

        if (code !== null) {
            LoginService.getTokens(code)
                .then(() => {
                    router("/");
                });
        } else {
            router("/error");
        }
    }, []);

    return (
        <div>
            
        </div>
    );
};

export default InterceptCodePage;