import React, {useEffect, useState} from 'react';
import StatisticsRequests from "../../../services/StatisticsRequests";
import {Box} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ReactECharts from "echarts-for-react";

const ProjectsWeekStats = () => {

    const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

    const startOption = {
        color: ["#fca903",
            // "#1341A9",
            "#FC1F02"
        ],
        title: {
            text: 'Проекты'
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
        legend: {
            data:['Создано', 'Удалено']
        },
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
            name: 'Создано',
            type: 'bar',
            data: [78, 69, 90, 14, 13, 64, 90]
        },
            {
                name: 'Удалено',
                type: 'bar',
                data: [78, 69, 90, 14, 13, 64, 90]
            }]
    };

    const [dataCreations, setDataCreations] = useState<number[]>([]);
    const [dataDeletions, setDataDeletions] = useState<number[]>([]);
    const [dimensions, setDimensions] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchData = async () => {
        setIsLoading(true);
        await StatisticsRequests.getProjectsStatisticsForLastWeek()
            .then(value => {
                console.log(value.data)
                setDataCreations(value.data.map(value => value.creations));
                setDataDeletions(value.data.map(value => value.deletions));
                setDimensions(value.data.map(value => value.dayOfWeek));
            })
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();

    }, []);

    const getOption = (dataCreations: number[], dataDeletions: number[], dimensions: number[]) => {
        let newOption = startOption;

        newOption.series = [{
            name: 'Создано',
            type: 'bar',
            data: dataCreations
        },
            {
                name: 'Удалено',
                type: 'bar',
                data: dataDeletions
            }];
        newOption.xAxis.data = dimensions.map(value => days[value - 1]);

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
                    option={getOption(dataCreations, dataDeletions, dimensions)}
                    style={{ height: 240 }}
                    onEvents={onEvents}
                />
            }
        </div>
    );
};

export default ProjectsWeekStats;