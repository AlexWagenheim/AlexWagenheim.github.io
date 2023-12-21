import React, {FC} from 'react';
import {ResourceOwner} from "../../../entity/user/ResourceOwner";
import ProjectNameField from "../../ProjectNameField";
import {ButtonGroup, Chip, createTheme, Paper, ThemeProvider, Tooltip} from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import CodeIcon from "@mui/icons-material/Code";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import ExecutingWeekStats from "../statistics/ExecutingWeekStats";
import anon from "../../../images/anon.png";


interface i_UserInfo{
    user: ResourceOwner;
    editUser: (userId: string) => void;
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

const UserInfo: FC <i_UserInfo> = ({ user, editUser}) => {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 120,
                        minWidth: 300
                    }}
                >
                    <div>
                        <div className="row align-items-start">
                            <div className="col-2" style={{maxWidth: 120}}>
                                {
                                    user.avatarUrl !== '' ?
                                        <img src={user.avatarUrl} style={{objectFit: "cover", width: 100, height: 100, borderRadius: '50%'}} alt={"photo_user"}/>
                                        :
                                        <img src={anon} style={{objectFit: "cover", width: 100, height: 100, borderRadius: '50%'}} alt={"photo_anon"}/>
                                }
                            </div>
                            <div className="col" style={{minWidth: 365}}>
                                {user.roles.filter(value => value === "ROLE_ADMIN").length === 0
                                    ?
                                    <h4 className="d-inline-block text-truncate" style={{maxWidth: 300}}>{user.username}</h4>
                                    :
                                    <h4 className="d-inline-block text-truncate" style={{maxWidth: 300, color: '#ffb300'}}>{user.username}</h4>
                                }
                                <div>
                                    Последнее подключение: {new Date(user.lastLoginDateTime)
                                    .toLocaleDateString([], {hour: '2-digit', minute: '2-digit'})}
                                </div>
                            </div>
                            <div className="col" style={{minWidth: 150}}>
                                <div className="d-flex justify-content-center">
                                    {user.active
                                        ?
                                        <Chip label="Активен" color="primary" />
                                        :
                                        <Chip label="Заблокирован" color="error" />
                                    }
                                </div>
                            </div>
                            <div className="col" style={{minWidth: 150}}>
                                <div className="float-right">
                                    <Button variant="contained"
                                            endIcon={<EditIcon />}
                                            style={{outline: 'none'}}
                                            onClick={() => {editUser(user.id)}}
                                    >
                                        Редактировать
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Paper>
            </ThemeProvider>
        </div>
    );
};

export default UserInfo;