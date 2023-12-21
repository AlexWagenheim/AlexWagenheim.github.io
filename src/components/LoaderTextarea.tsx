import React, {FC} from 'react';
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import '../styles/Editor.css';
import { Box } from '@mui/material';

interface i_LoaderTextarea{
}

const LoaderTextarea: FC <i_LoaderTextarea> = () => {
    return (
        <div className={'border_loading'}>
            <Stack sx={{ color: '#333'}}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="51vh"
                    width={"96vw"}
                    sx={{opacity: '30%'}}
                >
                    <CircularProgress color="inherit"/>
                </Box>
            </Stack>
        </div>
    );
};

export default LoaderTextarea;