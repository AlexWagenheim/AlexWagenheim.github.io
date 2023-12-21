import React, {useEffect, useState} from 'react';
import {ResourceOwner} from "../../../entity/user/ResourceOwner";
import AdminRequests from "../../../services/AdminRequests";
import {AxiosError} from "axios";
import Loader from "../../Loader";
import UserList from "./UserList";
import {
    Box,
    ButtonGroup,
    createTheme,
    FormControl,
    Grid,
    InputLabel,
    MenuItem, Paper,
    Select,
    ThemeProvider,
    Tooltip
} from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import UserSearch from "../UserSearch";
import SiteTraffic from "../statistics/SiteTraffic";
import UserConnection from "../statistics/UserConnection";
import UserRegistration from "../statistics/UserRegistration";
import ProjectsWeekStats from "../statistics/ProjectsWeekStats";
import CompilingWeekStats from "../statistics/CompilingWeekStats";
import ExecutingWeekStats from "../statistics/ExecutingWeekStats";
import AdminEditUser from "./AdminEditUser";

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000'
        },
        secondary: {
            main: '#ffb300'
        }
    },
});

const AdminUserManagement = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<ResourceOwner[]>([] as ResourceOwner[]) ;
    const [editableUserId, setEditableUserId] = useState<string>('');
    const [openedPanelValue, setOpenedPanelValue] = useState<string>("none");

    const openEditUserPanel = (userId: string) => {
        setEditableUserId(userId);
        setOpenedPanelValue("editUser");
    };

    const closeEditUserPanel = () => {
        setEditableUserId('');
        setOpenedPanelValue("none");
    };

    const fetching = async () => {
        setIsLoading(true);
        await AdminRequests.getAllUsers()
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error: AxiosError) => {
                console.log(error)
            });

        setIsLoading(false);
    }

    useEffect(() => {
        fetching();
    }, [])

    return (
        <div>
            <ThemeProvider theme={theme}>

                <Grid container spacing={3}>
                    <Grid item md={6} style={{minWidth: 560}}>
                        <div>
                            <UserSearch update={fetching}/>
                        </div>

                        <div style={{maxWidth: 900, width: "100%"}}>
                            <UserList items={users} editUser={openEditUserPanel} isLoading={isLoading}/>
                        </div>
                    </Grid>

                    <Grid item md={6} style={{minWidth: 750}}>
                        <TabContext value={openedPanelValue}>
                            <TabPanel value="1">Item One</TabPanel>
                            <TabPanel value="editUser" style={{padding: 0}}>
                                <AdminEditUser userId={editableUserId} closePanel={closeEditUserPanel}/>
                            </TabPanel>
                            <TabPanel value="3">Item Three</TabPanel>
                        </TabContext>
                    </Grid>
                </Grid>

            </ThemeProvider>
        </div>
    );
};

export default AdminUserManagement;