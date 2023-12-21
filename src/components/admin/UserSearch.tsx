import React, {FC} from 'react';
import {ButtonGroup, FormControl, Tooltip} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import RefreshIcon from '@mui/icons-material/Refresh';

interface i_UserSearch {
    update: () => void;
}

const UserSearch:FC<i_UserSearch> = ({update}) => {
    return (
        <div>
            <FormControl sx={{minWidth: 450}} size={"small"}>
                <TextField label="Поиск"
                           variant="outlined"
                           size={"small"}
                />

            </FormControl>

            <ButtonGroup
                variant="text"
                aria-label="text button group"
            >
                <Tooltip title="Найти">
                    <Button style={{outline: 'none'}}><SearchIcon/></Button>
                </Tooltip>
                <Tooltip title="Фильтр">
                    <Button
                        style={{outline: 'none'}}
                        onClick={update}
                    >
                        <RefreshIcon/>
                        {/*<TuneIcon/>*/}
                    </Button>
                </Tooltip>
            </ButtonGroup>
        </div>
    );
};

export default UserSearch;