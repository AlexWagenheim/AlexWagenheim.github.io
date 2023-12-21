import React from 'react';
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import '../styles/Editor.css';
import { Box } from '@mui/material';

const LoaderProjects = () => {
    return (
        <div>
            <Stack sx={{ color: '#fca903'}}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="80vh">
                    <CircularProgress color="inherit" />
                </Box>
            </Stack>
        </div>
    );
};

export default LoaderProjects;