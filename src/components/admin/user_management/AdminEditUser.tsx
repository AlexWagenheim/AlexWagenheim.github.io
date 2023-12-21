import React, {FC, useEffect, useState} from 'react';
import {Box, Chip, CircularProgress, createTheme, Divider, IconButton, Paper, ThemeProvider} from "@mui/material";
import {ResourceOwner} from "../../../entity/user/ResourceOwner";
import CloseIcon from '@mui/icons-material/Close';
import AdminRequests from "../../../services/AdminRequests";
import anon from "../../../images/anon.png";
import ChangeUserStatusField from "./ChangeUserStatusField";
import ChangeUserRoleField from "./ChangeUserRoleField";
import AdminEditUserProjects from "./AdminEditUserProjects";

interface i_AdminEditUser{
    userId: string
    closePanel: () => void;
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffb300'
        },
        secondary: {
            main: '#ebebeb'
        }
    },
});

const theme2 = createTheme({
    palette: {
        primary: {
            main: '#ffb300'
        },
        secondary: {
            main: '#000000'
        }
    },
});

const AdminEditUser:FC<i_AdminEditUser> = ({userId, closePanel}) => {

    const [user, setUser] = useState<ResourceOwner>({} as ResourceOwner);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchData = async () => {
        setIsLoading(true);
        await AdminRequests.getUserById(userId)
            .then(value => {
                setUser(value.data);
            })
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [userId]);


        return (
        <div>
            <ThemeProvider theme={theme}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 360,
                        minWidth: 750
                    }}
                >
                    {isLoading
                        ?
                        <Box sx={{ display: 'flex', height: '100%'}}
                             display="flex"
                             justifyContent="center"
                             alignItems="center"
                        >
                            <CircularProgress />
                        </Box>
                        :
                        <div>
                            <div className="row">
                                <div className="col" style={{maxWidth: 170}}>
                                    {
                                        user.avatarUrl !== '' ?
                                            <img src={user.avatarUrl} style={{objectFit: "cover", width: 150, height: 150, borderRadius: '50%'}} alt={"photo_user"}/>
                                            :
                                            <img src={anon} style={{objectFit: "cover", width: 150, height: 150, borderRadius: '50%'}} alt={"photo_anon"}/>
                                    }
                                </div>
                                <div className="col" style={{minWidth: 520}}>
                                    <div>
                                        {user.roles.filter(value => value === "ROLE_ADMIN").length === 0
                                            ?
                                            <h3 className="d-inline-block text-truncate" style={{maxWidth: 500}}>{user.username}</h3>
                                            :
                                            <h3 className="d-inline-block text-truncate" style={{maxWidth: 500, color: '#ffb300'}}>{user.username}</h3>
                                        }
                                    </div>

                                    <div className="d-inline-block text-truncate" style={{maxWidth: 500}} >
                                        <b>ФИО:</b> {user.secondName + " " + user.firstName + " " + user.middleName}
                                    </div>
                                    <div>
                                        <b>e-mail:</b> {user.email}
                                    </div>
                                    <div>
                                        <b>Первое подключение:</b> {new Date(user.firstLoginDateTime)
                                        .toLocaleDateString([], {hour: '2-digit', minute: '2-digit'})}
                                    </div>
                                    <div>
                                        <b>Последняя активность:</b> {new Date(user.lastLoginDateTime)
                                        .toLocaleDateString([], {hour: '2-digit', minute: '2-digit'})}
                                    </div>
                                </div>
                                <div className="col" style={{width: 50}}>
                                    <div className="float-right">
                                        <ThemeProvider theme={theme2}>
                                            <IconButton color="secondary" style={{outline: 'none'}} onClick={closePanel}>
                                                <CloseIcon/>
                                            </IconButton>
                                        </ThemeProvider>
                                    </div>
                                </div>
                            </div>
                            <Divider style={{paddingTop: 10, paddingBottom: 10}}>
                                {/*<Chip label="Права и состояния"/>*/}
                            </Divider>
                            <div>
                                <ChangeUserStatusField user={user}/>
                            </div>
                            <div>
                                <ChangeUserRoleField user={user}/>
                            </div>
                            <Divider style={{paddingTop: 10, paddingBottom: 10}}/>
                        </div>
                    }
                </Paper>
                <AdminEditUserProjects userId={userId}/>
            </ThemeProvider>
        </div>
    );
};

export default AdminEditUser;