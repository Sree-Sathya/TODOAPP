import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Edit from '@mui/icons-material/Edit';
import EditFormModal from "./EditFormModal";
import { Task } from "../ToDoContext";

interface EditIconProps {
    currentRowData: Task
};

const EditIcon: React.FC<EditIconProps> = (props) => {

    const [open, setOpen] = React.useState<boolean>(false);

    const handleModalOpen = () => {
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button data-testid = "edit-icon" endIcon={<Edit />} onClick={() => handleModalOpen()}>
            </Button>
            <Dialog
                open={open}
                onClose={handleModalClose}
            >
                <EditFormModal handleClose={handleModalClose} data={props.currentRowData} />
            </Dialog>
        </>

    );
};
export default EditIcon;