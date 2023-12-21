import React, {FC, useEffect, useInsertionEffect, useState} from 'react';
import {CompatClient} from "@stomp/stompjs/esm6";
import {ResourceOwner} from "../entity/user/ResourceOwner";
import {styled, useTheme, Theme, CSSObject, makeStyles} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Button, createTheme, ThemeProvider} from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import BarChartIcon from '@mui/icons-material/BarChart';
import GroupIcon from '@mui/icons-material/Group';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TaskIcon from '@mui/icons-material/Task';
import {AxiosError} from "axios";
import AdminRequests from "../services/AdminRequests";
import UserList from "../components/admin/user_management/UserList";
import AdminStatistics from "../components/admin/AdminStatistics";
import LoginService from "../services/LoginService";
import {useNavigate} from "react-router-dom";
import AdminUserManagement from "../components/admin/user_management/AdminUserManagement";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

interface i_Console {
    stompClient: CompatClient;
    user: ResourceOwner;
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffb300'
        },
        secondary: {
            main: '#000000'
        }
    },
});

const Console: FC <i_Console> = ({stompClient, user}) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('1');
    const navigate = useNavigate();

    const logout = () => {
        LoginService.logout();
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (

        <ThemeProvider theme={theme}>
            <TabContext value={value}>
                {/*<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>*/}
                {/*    */}
                {/*</Box>*/}

                <Box sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                    display: 'flex'
                }}>
                    <CssBaseline />
                    <AppBar position="fixed" open={open} >
                        <Toolbar>
                            <IconButton
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                style={{outline: 'none'}}
                                sx={{
                                    marginRight: 5,
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap style={{minWidth: 200}} component="div">
                                Панель управления
                            </Typography>
                            {/*<div className='d-flex justify-content-end w-100'>*/}
                            {/*    <Button sx={{color: "black", outline: "none"}} onClick={logout}>*/}
                            {/*        Выйти*/}
                            {/*    </Button>*/}
                            {/*</div>*/}
                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" open={open}>
                        <DrawerHeader>
                            <IconButton style={{outline: 'none'}} onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </DrawerHeader>
                        <Divider />
                        <List>

                            <ListItem key={"Статистика"}  disablePadding sx={{ display: 'block' }}
                                      selected={value === '1'}>
                                <ListItemButton
                                    style={{outline: 'none'}}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    onClick={event => {setValue('1')}}
                                >
                                    <ListItemIcon
                                        style={{outline: 'none'}}
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <BarChartIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Статистика"} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>

                            <ListItem key={"Пользователи"} disablePadding sx={{ display: 'block' }}
                                      selected={value === '2'}>
                                <ListItemButton
                                    style={{outline: 'none'}}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    onClick={event => {setValue('2')}}
                                >
                                    <ListItemIcon
                                        style={{outline: 'none'}}
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <GroupIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Пользователи"} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>

                            {/*<ListItem key={"Отчёты"} disablePadding sx={{ display: 'block' }}*/}
                            {/*          selected={value === '3'}>*/}
                            {/*    <ListItemButton*/}
                            {/*        style={{outline: 'none'}}*/}
                            {/*        sx={{*/}
                            {/*            minHeight: 48,*/}
                            {/*            justifyContent: open ? 'initial' : 'center',*/}
                            {/*            px: 2.5,*/}
                            {/*        }}*/}
                            {/*        onClick={event => {setValue('3')}}*/}
                            {/*    >*/}
                            {/*        <ListItemIcon*/}
                            {/*            style={{outline: 'none'}}*/}
                            {/*            sx={{*/}
                            {/*                minWidth: 0,*/}
                            {/*                mr: open ? 3 : 'auto',*/}
                            {/*                justifyContent: 'center',*/}
                            {/*            }}*/}
                            {/*        >*/}
                            {/*            <ContentPasteSearchIcon/>*/}
                            {/*        </ListItemIcon>*/}
                            {/*        <ListItemText primary={"Отчёты"} sx={{ opacity: open ? 1 : 0 }} />*/}
                            {/*    </ListItemButton>*/}
                            {/*</ListItem>*/}

                            <Divider />

                            <ListItem key={"Выйти"}  disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    style={{outline: 'none'}}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    onClick={event => {navigate("/")}}
                                >
                                    <ListItemIcon
                                        style={{outline: 'none'}}
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <ExitToAppIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Выйти"} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>

                        </List>
                    </Drawer>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <DrawerHeader />

                        {/*<UserList items={users} isLoading={isLoading}/>*/}
                        <TabPanel value="1" style={{padding: 0}}>
                            <AdminStatistics/>
                        </TabPanel>
                        <TabPanel value="2" style={{padding: 0}}>
                            <AdminUserManagement/>
                        </TabPanel>
                        {/*<TabPanel value="3" style={{padding: 0}}>*/}

                        {/*</TabPanel>*/}
                    </Box>
                </Box>
            </TabContext>
        </ThemeProvider>
    );
};

export default Console;