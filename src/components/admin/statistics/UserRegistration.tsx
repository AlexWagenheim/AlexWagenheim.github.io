import React, {useEffect, useState} from 'react';
import StatisticsRequests from "../../../services/StatisticsRequests";
import {Box} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const UserRegistration = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [registrations, setRegistrations] = useState<number>(0);

    const fetchData = async () => {
        setIsLoading(true);
        await StatisticsRequests.getTodayRegistrations()
            .then(value => {
                setRegistrations(value.data);
            });
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={{height: '100%'}}>
            {isLoading
                ?
                <Box sx={{ color: '#fca903', height: '100%'}}
                     display="flex"
                     justifyContent="center"
                     alignItems="center"
                >
                    <CircularProgress sx={{ color: '#fca903', height: '100%'}} color="inherit" />
                </Box>
                :
                <div style={{height: '100%'}}>
                    <h4>Регистраций сегодня:</h4>
                    <Box sx={{ color: '#fca903', height: '100%'}}
                         display="flex"
                         justifyContent="center"
                        // alignItems="center"
                         fontSize='100px'
                    >
                        {registrations}
                    </Box>
                </div>
            }
        </div>
    );
};

export default UserRegistration;