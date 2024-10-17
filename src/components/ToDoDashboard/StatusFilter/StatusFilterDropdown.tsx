import React, { useState, MouseEvent } from 'react';
import { Button, Checkbox, FormControlLabel, Menu, MenuItem } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Task, ToDoContextType } from "../ToDoContext";
import { TodoTaskContext } from "../ToDoTable";

const StatusFilterDropdown: React.FC = () => {
    const { filterTodo } = React.useContext(TodoTaskContext) as ToDoContextType;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
        All: false,
        Active: false,
        Completed: false,
        "Not Started": false,
    });

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCheckboxChange = (name: string) => {

        const defaultCheckItems = {
            All: false,
            Active: false,
            Completed: false,
            "Not Started": false,
        };

        // console.log();
        setCheckedItems({ ...defaultCheckItems, [name]: true });

        filterTodo(name);
    };

    const open = Boolean(anchorEl);

    return (
        <div>
            <Button variant="contained" onClick={handleClick} endIcon={<FilterAltIcon />} style={{ backgroundColor: "#3A5B8A" }} >
                Status Filter
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {["All", "Active", "Completed", "Not Started"].map((option) => (
                    <MenuItem key={option} onClick={() => handleCheckboxChange(option)}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checkedItems[option]}
                                    onChange={() => handleCheckboxChange(option)}
                                    name={option}
                                    data-testid={option}
                                />
                            }
                            label={option}
                        />
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default StatusFilterDropdown;
