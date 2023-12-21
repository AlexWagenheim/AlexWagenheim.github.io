import React, {FC} from 'react';
import {Box, Tab} from '@mui/material';
import {TabContext, TabList, TabPanel} from "@mui/lab";
import '../styles/MuiTabs.css';
import { styled } from '@mui/material/styles';
import {CompilerMessage} from "../entity/compiling/dto/CompilerMessage";

interface i_OutTabs{
    CM: CompilerMessage[];
    compilerStatusCode: string;
    executorOutput: string;
    executorInput: string;
    setExecutorInput: (s: string) => void;
    value: string,
    setValue: (value: string) => void
}

const AntTab0 = styled(Tab)(
    ({ theme }) => ({
        textTransform: 'none',
        [theme.breakpoints.up('sm')]: {
            minWidth: 0,
        },
        fontWeight: theme.typography.fontWeightRegular,
        fontFamily: [
            'Inter',
        ].join(','),
        text: 'outlined',
    }),
);


export const OutTabs: FC <i_OutTabs> = ({CM,
                                        compilerStatusCode,
                                        executorOutput,
                                        executorInput,
                                        setExecutorInput,
                                        value,
                                        setValue
                                        }) => {

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    };

    return (
        <Box sx={{color: '#fca903', paddingLeft: "25px", marginTop: "-24px", outline: 'none'}}>
            <TabContext value={value}>
                <TabList
                    onChange={handleChange}
                    TabIndicatorProps={{sx: {backgroundColor: '#fca903', marginBottom: "10px", outline: 'none'}}}
                    sx={{"& button": {backgroundColor: '#FFFFFF', outline: 'none'}}}>
                    <AntTab0 label={'Ввод'} style={{color: "#000000", outline: 'none'}} value={'0'} />
                    <AntTab0 label={'Вывод'} style={{color: "#000000", outline: 'none'}} value={'1'}/>
                    <AntTab0 label={'Сообщения компилятора'} style={{color: "#000000", outline: 'none'}} value={'2'}/>
                </TabList>
                {/*Содержимое вкладок*/}
                <Box sx={{marginLeft: "-25px", marginTop: "-24px", outline: 'none'}}>

                    <TabPanel value={'0'}>
                        <div className={'output'}>
                            <textarea value={executorInput} onChange={event => {setExecutorInput(event.target.value)}}/>
                        </div>
                    </TabPanel>

                    <TabPanel value={'1'}>
                        <div className={'output'}>
                            <textarea readOnly value={
                                executorOutput
                            }/>
                        </div>
                    </TabPanel>

                    <TabPanel value={'2'}>
                        <div className={'output'}>
                            <textarea readOnly value={
                                (CM.length === 0)?
                                    compilerStatusCode
                                    :
                                    compilerStatusCode +
                                    CM.map(message => '\n' + '\n' + message.messageType + ' ' + message.moduleName + ', line ' + message.line
                                        + '\n' + message.message + '\n' + message.explanation).join('')
                            }/>
                        </div>
                    </TabPanel>
                </Box>
            </TabContext>
        </Box>
    );
};