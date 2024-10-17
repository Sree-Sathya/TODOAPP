import React, { useState } from "react";
import Button from '@mui/material/Button';
import Delete from '@mui/icons-material/Delete';
import { TodoTaskContext } from "../ToDoTable";
import { Task, ToDoContextType } from "../ToDoContext";

interface DeleteIconprops {
    currentRowData: Task
}
const DeleteIcon: React.FC<DeleteIconprops> = (props) => {


    const { deleteTodo } = React.useContext(TodoTaskContext) as ToDoContextType;

    const handleDelete = (event: React.MouseEvent<HTMLElement>) => {

        event.preventDefault();
        deleteTodo(props.currentRowData);


    };


    return (
        <Button data-testid= "delete" endIcon={<Delete />} onClick={(event) => handleDelete(event)}>
        </Button>
    );
};
export default DeleteIcon;