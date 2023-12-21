import React, {FC} from 'react';
import {Box, createTheme, IconButton, Tab, Tabs, ThemeProvider} from '@mui/material';
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {useState} from "react";
import '../styles/MuiTabs.css';
import {ProjectModule} from "../entity/project/ProjectModule";
import ProjectModuleEditor from "./ProjectModuleEditor";
import { styled } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import Snackbar from '@mui/material/Snackbar';
import AddIcon from '@mui/icons-material/Add';

interface i_MuiTabs{
    modules: ProjectModule[];
    setModules: (module: ProjectModule[]) => void;
    createModules: (name: string, body: string) => void;
    isLoadingSave: boolean;
    isLoadingCompile: boolean;
    isLoadingExecute: boolean;
}

const AntTab = styled(Tab)(
    ({ theme }) => ({
        textTransform: 'none',
        borderColor: '#FFFFFF',
        [theme.breakpoints.up('sm')]: {
            minWidth: 0,
        },
        fontWeight: theme.typography.fontWeightRegular,
        fontFamily: [
            'Inter',
        ].join(','),
        text: 'outlined'
    }),
);

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffb300'
        },
        secondary: {
            main: '#ffffff'
        }
    },
});

export const MuiTabs: FC <i_MuiTabs> = ({modules,
                                       setModules,
                                       createModules,
                                       isLoadingSave,
                                       isLoadingCompile,
                                       isLoadingExecute}) => {

    const [value, setValue] = useState('0');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    };

    const upDateModule = (module: ProjectModule) => {
        setModules(modules.map(item => {
            if (item.name === module.name){
                item.body = module.body;
            }
            return item;
        }))
    };

    const deleteModule = (i: number) => {
        delete modules[i];
        setModules(modules);
    };

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <IconButton
                    size="small"
                    aria-label="close"
                    onClick={handleClose}
                    color="secondary"
                    style={{outline: 'none'}}
                >
                    <ClearIcon/>
                </IconButton>
            </ThemeProvider>
        </React.Fragment>
    );

    return (
        <div>
            {modules.length < 4 ?
                <div>
                    <Box sx={{color: '#fca903', paddingLeft: "25px", borderColor: '#FFFFFF', outline: 'none'}}>
                        <TabContext value={value}>
                            {/*Вкладки*/}
                            <Box>
                                <TabList
                                    onChange={handleChange}
                                    TabIndicatorProps={{
                                        sx: {backgroundColor: '#fca903',
                                            marginBottom: '10px',
                                            borderColor: '#FFFFFF',
                                            outline: 'none'}}}
                                    sx={{
                                        "& button": {backgroundColor: '#FFFFFF',
                                            border: 0,
                                            outline: 'none'}}}>
                                    {
                                        modules.map((item, i) =>
                                            <AntTab label={item.name}
                                                    value={String(i)}
                                                    style={{
                                                        color: "#333333",
                                                        borderColor: "#FFFFFF",
                                                        outline: 'none',
                                                        marginBottom: '-10px',
                                                        marginTop: '-10px'
                                                    }}
                                                    icon={
                                                        <IconButton
                                                            sx={{margin: '0px',
                                                                padding: '0px'}}
                                                            onClick={() => {deleteModule(i)}}
                                                        >
                                                            <ClearIcon sx={{fontSize: '14px',
                                                                margin: '0px',
                                                                padding: '0px'}}/>
                                                        </IconButton>
                                                    }
                                                    iconPosition={"end"}
                                            />
                                        )
                                    }
                                    <Box
                                        sx={{
                                            "& button": {backgroundColor: '#FFFFFF', height: '50px', outline: 'none'},
                                            "& button:hover": {backgroundColor: '#FFFFFF', outline: 'none'},
                                            "& button:focus": {backgroundColor: '#FFFFFF', outline: 'none'},
                                            "& button:active": {backgroundColor: '#FFFFFF', border: '0px', borderColor: '#FFFFFF', outline: 'none'}}}>

                                        {/*Создать новый модуль с именем Module{i} и содержимым программы Hello World*/}
                                        <IconButton
                                            onClick={() => {
                                                if (modules.length > 10) {
                                                    handleClick()
                                                }
                                                else {
                                                    createModules(
                                                        'Module' + modules.length + '.m',
                                                        'MODULE '  + 'Module' + modules.length + ';' + '\n' +
                                                        'IMPORT Out;' + '\n' +
                                                        'BEGIN' + '\n' +
                                                        '   Out.String( "Hello World" );' + '\n' +
                                                        '   Out.Ln;' + '\n' +
                                                        'END '  + 'Module' + modules.length + '.');
                                                    setValue(String(modules.length));
                                                }
                                            }}
                                        >
                                            <AddIcon sx={{fontSize: '14px'}}/>
                                        </IconButton>
                                    </Box>
                                </TabList>
                            </Box>
                            <Box sx={{marginLeft: "-25px",
                                marginTop: "-24px",
                                outline: 'none'}}>
                                {/*Содержимое вкладок*/}
                                {modules.map((item, i) =>
                                    <TabPanel value={String(i)}>
                                        <ProjectModuleEditor
                                            name={item.name}
                                            body={item.body}
                                            upDateModule={upDateModule}
                                            isLoadingSave={isLoadingSave}
                                            isLoadingCompile={isLoadingCompile}
                                            isLoadingExecute={isLoadingExecute}
                                        />
                                    </TabPanel>
                                )}
                            </Box>
                        </TabContext>
                    </Box>
                </div>
                :
                <div>
                    <Box sx={{color: '#fca903', paddingLeft: "25px", borderColor: '#FFFFFF', outline: 'none'}}>
                        <TabContext value={value}>
                            {/*Вкладки*/}
                            <Box>
                                <TabList
                                    onChange={handleChange}
                                    TabIndicatorProps={{
                                        sx: {backgroundColor: '#fca903',
                                            marginBottom: '10px',
                                            borderColor: '#FFFFFF',
                                            outline: 'none'}}}
                                    sx={{
                                        "& button": {backgroundColor: '#FFFFFF',
                                            border: 0,
                                            outline: 'none'}}}>
                                    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
                                        <Tabs
                                            value={value}
                                            onChange={handleChange}
                                            variant="scrollable"
                                            scrollButtons
                                            allowScrollButtonsMobile
                                            aria-label="scrollable force tabs example"
                                            TabIndicatorProps={{
                                                sx: {backgroundColor: '#fca903',
                                                    marginBottom: '10px',
                                                    borderColor: '#FFFFFF',
                                                    outline: 'none'}}}>
                                            {
                                                modules.map((item, i) =>
                                                    <AntTab label={item.name}
                                                            value={String(i)}
                                                            style={{
                                                                color: "#333333",
                                                                borderColor: "#FFFFFF",
                                                                outline: 'none',
                                                                marginBottom: '-10px',
                                                                marginTop: '-10px'
                                                            }}
                                                            icon={
                                                                <IconButton
                                                                    sx={{margin: '0px',
                                                                        padding: '0px'}}
                                                                    onClick={() => {deleteModule(i)}}
                                                                >
                                                                    <ClearIcon sx={{fontSize: '14px',
                                                                        margin: '0px',
                                                                        padding: '0px'}}/>
                                                                </IconButton>
                                                            }
                                                            iconPosition={"end"}
                                                    />
                                                )
                                            }
                                        </Tabs>
                                    </Box>
                                            <Box
                                                sx={{
                                                    "& button": {backgroundColor: '#FFFFFF', height: '50px', outline: 'none'},
                                                    "& button:hover": {backgroundColor: '#FFFFFF', outline: 'none'},
                                                    "& button:focus": {backgroundColor: '#FFFFFF', outline: 'none'},
                                                    "& button:active": {backgroundColor: '#FFFFFF', border: '0px', borderColor: '#FFFFFF', outline: 'none'}}}>

                                            {/*Создать новый модуль с именем Module{i} и содержимым программы Hello World*/}
                                            <IconButton
                                                onClick={() => {
                                                    if (modules.length > 10) {
                                                        handleClick()
                                                    }
                                                    else {
                                                        createModules(
                                                            'Module' + modules.length + '.m',
                                                            'MODULE '  + 'Module' + modules.length + ';' + '\n' +
                                                            'IMPORT Out;' + '\n' +
                                                            'BEGIN' + '\n' +
                                                            '   Out.String( "Hello World" );' + '\n' +
                                                            '   Out.Ln;' + '\n' +
                                                            'END '  + 'Module' + modules.length + '.');
                                                        setValue(String(modules.length));
                                                    }
                                                }}
                                                sx={{
                                                    borderRadius: '0px'
                                                }}
                                            >
                                                <AddIcon sx={{fontSize: '14px', borderRadius: '0px'}}/>
                                            </IconButton>
                                        </Box>

                                </TabList>
                            </Box>
                            <Box sx={{marginLeft: "-25px",
                                marginTop: "-24px",
                                outline: 'none'}}>
                                {/*Содержимое вкладок*/}
                                {modules.map((item, i) =>
                                    <TabPanel value={String(i)}>
                                        <ProjectModuleEditor
                                            name={item.name}
                                            body={item.body}
                                            upDateModule={upDateModule}
                                            isLoadingSave={isLoadingSave}
                                            isLoadingCompile={isLoadingCompile}
                                            isLoadingExecute={isLoadingExecute}
                                        />
                                    </TabPanel>
                                )}
                            </Box>
                        </TabContext>
                    </Box>
                </div>
            }
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Превышено максимально допустимое число модулей!"
                action={action}
            />
        </div>
    );
};