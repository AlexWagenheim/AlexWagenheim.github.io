import React, {FC} from 'react';
import {ResourceOwner} from "../../../entity/user/ResourceOwner";
import {Paper} from "@mui/material";

interface i_AdminUserEdit{
    userId: string
    closePanel: () => void;
}

const AdminUserEdit:FC<i_AdminUserEdit> = ({userId, closePanel}) => {
    return (
        <div>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240
                }}
            >
                {userId}
            </Paper>
        </div>
    );
};

export default AdminUserEdit;