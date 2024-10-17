import React, { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import { TodoTaskContext } from "../ToDoTable";
import { Task, ToDoContextType } from "../ToDoContext";
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { v4 as uuidv4 } from 'uuid';

interface CreateTodoModalProps {
    handleClose: () => void;
    //Add handler methids
}

const CreateTodoModal: React.FC<CreateTodoModalProps> = (props) => {

    const { createTodo } = React.useContext(TodoTaskContext) as ToDoContextType;
    const [formData, setFormData] = useState<Task>({
        id: uuidv4(),
        taskName: "",
        description: "",
        status: ""
    });

    const handleCreateTodo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>
        , formData: Task | any) => {
        e.preventDefault();

        createTodo(formData);
        props.handleClose();
    };

    const handleForm = (e: React.ChangeEvent<HTMLInputElement>): void => {

        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value,
        });
    };
    const handleSelect = (e: SelectChangeEvent): void => {
        setFormData({
            ...formData,
            ["status"]: e.target.value,
        });
    };

    const isValid = formData.taskName.length > 0 && formData.description.length && formData.status.length;


    return (
        <div style={{ width: 600, height: 500 }}>
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "2em" }}>
                <Typography variant="h4" component="h4" >
                    Create Task
                </Typography>

            </div>
            <div style={{ padding: "2em" }}>
                <div>
                    <TextField
                        required
                        fullWidth
                        id="taskName"
                        label="Task Name"
                        variant="outlined"
                        style={{ paddingBottom: "2em" }}
                        onChange={handleForm}
                        value={formData?.taskName || ""}

                    />
                    <TextField
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        variant="outlined"
                        onChange={handleForm}
                        value={formData?.description || ""}
                        style={{ paddingBottom: "2em" }}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="status"
                            // value={age}
                            label="status"
                            value={formData?.status || ""}
                            onChange={handleSelect}

                        >
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Not Started">Not Started</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div style={{ display: "flex", flexDirection: "row", padding: "2em", justifyContent: "space-between" }}>
                    <div>
                        <Button variant="contained" disabled={!isValid} style={{ backgroundColor: isValid ? "#3A5B8A" : "grey", color: isValid ? "white" : "black" }} onClick={(e) => { handleCreateTodo(e, formData) }}>
                            Save
                        </Button>
                    </div>
                    <div>
                        <Button variant="contained" style={{ backgroundColor: "#3A5B8A" }} onClick={() => { props.handleClose() }}>
                            close
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
};
export default CreateTodoModal;

