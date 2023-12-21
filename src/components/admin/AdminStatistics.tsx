import React from 'react';
import {Grid, Paper, styled} from "@mui/material";
import UserRegistration from "./statistics/UserRegistration";
import SiteTraffic from "./statistics/SiteTraffic";
import UserConnection from "./statistics/UserConnection";
import ProjectsWeekStats from "./statistics/ProjectsWeekStats";
import CompilingWeekStats from "./statistics/CompilingWeekStats";
import ExecutingWeekStats from "./statistics/ExecutingWeekStats";

const AdminStatistics = () => {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item md={6} style={{minWidth: 560}}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240
                        }}
                    >
                        <SiteTraffic/>
                    </Paper>
                </Grid>
                <Grid item md={3} style={{minWidth: 220}}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <UserConnection/>
                    </Paper>
                </Grid>
                <Grid item md={3} style={{minWidth: 220}}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <UserRegistration/>
                    </Paper>
                </Grid>
                {/*<Grid item md={2}>*/}
                {/*    <Paper*/}
                {/*        sx={{*/}
                {/*            p: 2,*/}
                {/*            display: 'flex',*/}
                {/*            flexDirection: 'column',*/}
                {/*            height: 240,*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <h4>Новые пользователи:</h4>*/}
                {/*    </Paper>*/}
                {/*</Grid>*/}
                <Grid item md={4} style={{minWidth: 520}}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <ProjectsWeekStats/>
                    </Paper>
                </Grid>
                <Grid item md={4} style={{minWidth: 520}}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <CompilingWeekStats/>
                    </Paper>
                </Grid>
                <Grid item md={4} style={{minWidth: 520}}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <ExecutingWeekStats/>
                    </Paper>
                </Grid>

                {/*Заготовка для будущих графиков*/}

                {/*<Grid item md={6}>*/}
                {/*    <Paper*/}
                {/*        sx={{*/}
                {/*            p: 2,*/}
                {/*            display: 'flex',*/}
                {/*            flexDirection: 'column',*/}
                {/*            height: 240,*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        Пользователи и проекты:*/}
                {/*    </Paper>*/}
                {/*</Grid>*/}
                {/*<Grid item md={3}>*/}
                {/*    <Paper*/}
                {/*        sx={{*/}
                {/*            p: 2,*/}
                {/*            display: 'flex',*/}
                {/*            flexDirection: 'column',*/}
                {/*            height: 240,*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        Обращения в тех. поддержку:*/}
                {/*    </Paper>*/}
                {/*</Grid>*/}
                {/*<Grid item md={3}>*/}
                {/*    <Paper*/}
                {/*        sx={{*/}
                {/*            p: 2,*/}
                {/*            display: 'flex',*/}
                {/*            flexDirection: 'column',*/}
                {/*            height: 240,*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        Зарегистрированные ошибки:*/}
                {/*    </Paper>*/}
                {/*</Grid>*/}
            </Grid>
        </div>
    );
};

export default AdminStatistics;