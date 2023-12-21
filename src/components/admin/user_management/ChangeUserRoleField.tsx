import React, {FC, useEffect, useState} from 'react';
import {ResourceOwner} from "../../../entity/user/ResourceOwner";
import {
    Alert,
    Chip, createTheme,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    Snackbar,
    styled,
    ThemeProvider
} from "@mui/material";
import AdminRequests from "../../../services/AdminRequests";
import {LoadingButton} from "@mui/lab";

interface i_ChangeUserRoleField {
    user: ResourceOwner;
}

interface ChipData {
    key: string;
    label: string;
    selected: boolean;
}

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

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

const ChangeUserRoleField:FC<i_ChangeUserRoleField> = ({user}) => {

    const [userRoles, setUserRoles] = useState<string[]>([]);
    const [roles, setRoles] = useState<string[]>([]);
    const [chipData, setChipData] = useState<ChipData[]>([
        { key: "ROLE_USER", label: 'Пользователь', selected: false },
        { key: "ROLE_ADMIN", label: 'Администратор', selected: false },
    ]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleClick = (key: string) => {
        let index = chipData.findIndex(value => value.key === key);
        let data = chipData;

        console.log(chipData);
        console.log(key);
        console.log(data);
        console.log(index);

        data[index].selected = !chipData[index].selected;

        setRoles(data.filter(value => value.selected).map(value => value.key));

        setChipData(data.map(value => value));
    }

    const [open, setOpen] = React.useState(false);

    const handleError = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const sendUserStatus = async () => {
        setIsLoading(true);
        AdminRequests.setUserRole(user.id, roles)
            .then(value => {
                setUserRoles(value.data.roles);
                setRolesDisplay(value.data.roles);
            })
            .catch(reason => {
                handleError();
            });
        setIsLoading(false);
    };

    const isArrayEquals = (a: string[], b: string[]):boolean => {
        if (a.length != b.length) {
            return false;
        }

        for (let i: number = 0; i < a.length; i++) {
            if (a[i] != b[i]) {
                return false;
            }
        }

        return true;
    }

    const setRolesDisplay = (roles: string[]) => {
        let data = chipData;

        for (let i: number = 0; i < data.length; i++) {
            data[i].selected = roles.includes(data[i].key);
        }

        setChipData(data);
    };

    useEffect(() => {
        setRoles(user.roles);
        setRolesDisplay(user.roles);
        setUserRoles(user.roles);
    }, []);

    return (
        <div style={{paddingTop: 10}}>
            <ThemeProvider theme={theme}>
                <FormControl sx={{ m: 1, width: 200}} size="small">
                    <div style={{paddingTop: 8}}>
                        <h5>Роли пользователя:</h5>
                    </div>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 200}} size="small" disabled={isLoading}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        listStyle: 'none'}}>
                        {chipData.map(data =>
                            <ListItem key={data.key}>
                                <Chip
                                    color={data.selected ? "primary" : "secondary"}
                                    label={data.label}
                                    onClick={event => {handleClick(data.key)}}
                                />
                            </ListItem>
                        )

                        }
                    </div>
                </FormControl>

                <FormControl sx={{ m: 1}} size="small" style={{paddingTop: 5}}>
                    {!isArrayEquals(userRoles, roles)
                        ?
                        <LoadingButton
                            loading={isLoading}
                            variant="contained"
                            size="small"
                            style={{outline: 'none'}}
                            onClick={sendUserStatus}
                        >
                            Сохранить
                        </LoadingButton>
                        :
                        <div></div>
                    }

                </FormControl>
            </ThemeProvider>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert variant={"filled"} onClose={handleClose} severity="error" sx={{ width: '100%' }} style={{outline: "none"}}>
                    Не удалось обновить список ролей пользователя
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ChangeUserRoleField;