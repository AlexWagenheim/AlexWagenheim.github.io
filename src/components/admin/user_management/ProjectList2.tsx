import React, {FC} from 'react';
import Project from "../../Project";
import ts from "typescript/lib/protocol";
import AdminProject from "./AdminProject";
import {Box, CircularProgress, Stack} from "@mui/material";
import {ProjectInfo} from "../../../entity/project/ProjectInfo";


interface i_ProjectList2{
    items: ProjectInfo[];
    isLoading: boolean;
    deleteProject: (projectId: string) => void;
}

const ProjectList2: FC <i_ProjectList2> = ({items, isLoading, deleteProject}) => {

    return (
        <div style={{overflowY: "auto", maxHeight: 420, paddingBottom: 10}}>
            {!isLoading ?
                <Stack spacing={1}>
                    {
                        items.map(item => <AdminProject projectName={item.name}
                                                    projectId={item.id}
                                                    projectDateLUDT={new Date(item.lastUpdateDateTime).toLocaleDateString()
                                                    + ' '+ new Date(item.lastUpdateDateTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                                                    key={item.id}
                                                    deleteProject={deleteProject}/>)
                    }
                </Stack>
                :
                <Box sx={{ display: 'flex', height: '100%'}}
                     display="flex"
                     justifyContent="center"
                     alignItems="center"
                >
                    <CircularProgress />
                </Box>
            }
        </div>
    );
};

export default ProjectList2;