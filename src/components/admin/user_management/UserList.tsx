import React, {FC} from 'react';
import LoaderProjects from "../../LoaderProjects";
import {ResourceOwner} from "../../../entity/user/ResourceOwner";
import UserInfo from "./UserInfo";
import {Box, CircularProgress, createTheme, Stack, ThemeProvider} from "@mui/material";

interface i_UserList{
    items: ResourceOwner[];
    isLoading: boolean;
    editUser: (userId: string) => void;
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffb300'
        },
        secondary: {
            main: '#ffb300'
        }
    },
});

const UserList: FC <i_UserList> = ({items, isLoading, editUser}) => {

    return (
        <div style={{height: '100%', width: '100%', overflowY: "auto", paddingTop: 10, paddingBottom: 10}}>
            <ThemeProvider theme={theme}>
                {!isLoading ?
                    <Stack spacing={1}>
                        {
                            items.map(item => <UserInfo user={item} editUser={editUser}
                                                        key={item.id}/>)
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
            </ThemeProvider>
        </div>
    );
};

export default UserList;