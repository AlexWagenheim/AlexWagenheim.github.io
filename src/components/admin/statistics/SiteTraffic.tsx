import React, {useCallback, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import ReactECharts from "echarts-for-react";
import Loader from "../../Loader";
import CircularProgress from "@mui/material/CircularProgress";
import {Box} from "@mui/material";
import StatisticsRequests from "../../../services/StatisticsRequests";
import {randomInt} from "crypto";


const SiteTraffic = () => {

    const startOption = {
        title: {
            text: 'Подключённые пользователи'
        },
        toolbox: {
            feature: {
                saveAsImage: {title: 'Сохранить'},
                dataZoom: {
                    title: {
                        zoom: 'Приблизить',
                        back: 'Отменить приближение'
                    }
                    },
                // restore: {title: 'Обновить'}
            }
        },
        // legend: {
        //     data:['Подключения']
        // },
        tooltip: {},
        grid: {left: '40px', right:'40px' },
        // legend: {
        //     data:['Label']
        // },
        xAxis: {
            data: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
            // width: 10
        },
        yAxis: {},
        series: [{
            name: 'Пользователи',
            type: 'bar',
            data: [78, 69, 90, 14, 13, 64, 90],
            color: '#fca903'
        }]
    };

    const [data, setData] = useState<number[]>([]);
    const [dimensions, setDimensions] = useState<string[]>([]);
    const [testMarker, setTestMarker] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchData = async () => {
        setIsLoading(true);
        await StatisticsRequests.getSiteTraffic()
            .then(value => {
                setData(value.data.map(value => value.connections));
                setDimensions(value.data.map(value => value.time.substring(0, value.time.length - 3)));
            })
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();

    }, []);

    const getOption = (data: number[], dimensions: string[]) => {
        let newOption = startOption;

        newOption.series = [{
            name: 'Пользователи',
            type: 'bar',
            data: data,
            color: '#fca903'
        }];
        newOption.xAxis.data = dimensions;

        return newOption;
    };

    const onEvents = {
        restore: fetchData
    };

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
                <ReactECharts
                    option={getOption(data, dimensions)}
                    style={{ height: 240 }}
                    // opts={{ locale: 'FR' }}
                    onEvents={onEvents}
                />
            }
        </div>
    );
};

export default SiteTraffic;