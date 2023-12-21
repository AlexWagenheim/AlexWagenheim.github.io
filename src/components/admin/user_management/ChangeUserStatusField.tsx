import React, {FC, useEffect, useState} from 'react';
import {Alert, Button, FormControl, MenuItem, Select, SelectChangeEvent, Snackbar} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {ResourceOwner} from "../../../entity/user/ResourceOwner";
import AdminRequests from "../../../services/AdminRequests";

interface i_ChangeUserStatusField {
    user: ResourceOwner;
}

const ChangeUserStatusField:FC<i_ChangeUserStatusField> = ({user}) => {

    const [userBaseStatus, setUserBaseStatus] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value);
    };

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
        AdminRequests.setUserStatus(user.id, status)
            .then(value => {
                setUserBaseStatus(getUserStatus(value.data.active));
                setUserStatus(value.data.active);
            })
            .catch(reason => {
                handleError();
            });
        setIsLoading(false);
    };

    const isUserActive = (status: string):boolean => {

        return status === "active";
    };

    const getUserStatus = (active: boolean): string => {
        if (active) {
            return "active";
        } else {
            return "locked";
        }
    };

    const setUserStatus = (active: boolean) => {
        setStatus(getUserStatus(active));
    };

    useEffect(() => {
        setUserStatus(user.active);
        setUserBaseStatus(getUserStatus(user.active))
    }, []);

    return (
        <div style={{paddingTop: 10}}>
            <FormControl sx={{ m: 1, width: 230}} size="small">
                <div style={{paddingTop: 8}}>
                    <h5>Статус учётной записи:</h5>
                </div>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 200}} size="small" disabled={isLoading}>
                <Select
                    value={status}
                    onChange={handleChange}

                >
                    <MenuItem value={"active"}>Активна</MenuItem>
                    <MenuItem value={"locked"}>Заблокирована</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1}} size="small" style={{paddingTop: 5}}>
                {isUserActive(status) != isUserActive(userBaseStatus)
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
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert variant={"filled"} onClose={handleClose} severity="error" sx={{ width: '100%' }} style={{outline: "none"}}>
                    Не удалось обновить статус пользователя
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ChangeUserStatusField;