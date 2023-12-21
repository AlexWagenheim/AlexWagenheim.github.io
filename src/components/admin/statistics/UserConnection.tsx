import React, {useEffect, useState} from 'react';
import StatisticsRequests from "../../../services/StatisticsRequests";
import {Box, Paper} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ReactECharts from "echarts-for-react";

const UserConnection = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [connections, setConnections] = useState<number>(0);

    const fetchData = async () => {
        setIsLoading(true);
        // let newOption = startOption;
        await StatisticsRequests.getTodayConnections()
            .then(value => {
                setConnections(value.data);
            });
        // setOption(startOption);
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
                    <h4>Подключений сегодня:</h4>
                    {/*<div style={{color: '#fca903', fontSize: '100pt', height: '100%', alignItems: 'center'}}>*/}
                    {/*    {connections}*/}
                    {/*</div>*/}
                    <Box sx={{ color: '#fca903', height: '100%'}}
                         display="flex"
                         justifyContent="center"
                         // alignItems="center"
                         fontSize='100px'
                    >
                        {connections}
                    </Box>
                </div>

            }
        </div>
    );
};

export default UserConnection;