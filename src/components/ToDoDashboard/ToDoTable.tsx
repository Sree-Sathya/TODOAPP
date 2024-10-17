import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from './DeleteIcon/DeleteIcon';
// import DefaultTodoData from "../../JSON/DefaultTodoData.json";
import { Task, ToDoContextType } from "./ToDoContext";
import Dialog from '@mui/material/Dialog';
import CreateTodoModal from './CreateTodo/CreateTodoModal';
import EditIcon from './EditIcon/EditIcon';
import StatusFilterDropdown from "./StatusFilter/StatusFilterDropdown";


export const TodoTaskContext = React.createContext<ToDoContextType | null>(null);


interface TodoContextProps {
    children?: React.ReactNode,

}

const ToDoTable: React.FC<TodoContextProps> = () => {

    const [todos, setTodos] = useState<Task[]>([]);
    const [filteredtodos, setFilteredTodos] = useState<Task[]>([]);
    const [createModalOpen, setCreateModalOpen] = React.useState<boolean>(false);


    useEffect(() => {
        const localTodosData: string | null = sessionStorage?.getItem("todos");
        if (localTodosData) {
            setTodos(JSON.parse(localTodosData));
            setFilteredTodos(JSON.parse(localTodosData));
        }


    }, []);

    const handleClose = () => {
        setCreateModalOpen(false);
    };

    const handleCreateModalOpen = () => {
        setCreateModalOpen(true);
    };



    const createTodo = (todo: Task) => {

        setTodos([...todos, todo]);
        setFilteredTodos([...todos, todo]);
        sessionStorage.setItem("todos", JSON.stringify([...todos, todo]));

    };

    const updateTodo = (todo: Task) => {
        const editedTodos = todos.filter((todoItem: Task) => {
            if (todoItem.id === todo.id) {

                return (
                    todoItem.id,
                    todoItem.taskName = todo.taskName,
                    todoItem.description = todo.description,
                    todoItem.status = todo.status);
            } else {
                return todoItem;
            }

        });

        setTodos(editedTodos);
        setFilteredTodos(editedTodos);
        sessionStorage.setItem("todos", JSON.stringify(editedTodos));
    };

    const deleteTodo = (todo: Task) => {
        const filteredTodos = todos.filter((todoItem: Task) => todoItem.id !== todo.id);

        setTodos(filteredTodos);
        setFilteredTodos(filteredTodos);
        sessionStorage.setItem("todos", JSON.stringify(filteredTodos));


    };

    const filterTodo = (filterName: string) => {
        const mainTodos = todos;
        console.log("mainTodos", mainTodos);

        if (filterName === "All") {

            setFilteredTodos(mainTodos);


        } else {
            const filterTodos = mainTodos.filter((todoItem: Task) => todoItem.status === filterName);
            console.log("filterTodos", filterTodos);
            setFilteredTodos(filterTodos);

        }

    }


    const columns: GridColDef[] = [
        // {
        //     field: "id",
        //     headerName: "ID",
        //     minWidth: 70
        // },
        {
            field: "taskName",
            headerName: "Task Name",
            headerAlign: 'center',
            align: 'center',
            minWidth: 320
        },
        {
            field: "description",
            headerName: "Description",
            headerAlign: 'center',
            align: 'center',
            minWidth: 470
        },
        {
            field: "status",
            headerName: "Status",
            headerAlign: 'center',
            align: 'center',
            minWidth: 350
        },
        {
            field: "Edit",
            headerName: "Edit",
            headerAlign: 'center',
            align: 'center',
            minWidth: 100,
            renderCell: (params) => (
                <EditIcon
                    currentRowData={params.row}
                />
            ),
            // renderCell: (params) => (<EditIcon />)

        },
        {
            field: "Delete",
            headerName: "Delete",
            headerAlign: 'center',
            align: 'center',
            minWidth: 100,
            renderCell: (params) => (
                <DeleteIcon
                    currentRowData={params.row}
                />
            ),

        }
    ];


    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <TodoTaskContext.Provider value={{ todos, createTodo, updateTodo, deleteTodo, filterTodo }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div style={{ padding: "2em 0 0 5em", display: "flex", justifyContent: "flex-start" }}>
                        <Button variant="contained" endIcon={<AddIcon />} style={{ backgroundColor: "#3A5B8A" }} onClick={handleCreateModalOpen}>
                            Add Task
                        </Button>
                        <Dialog
                            open={createModalOpen}
                            onClose={handleClose}
                        >
                            <CreateTodoModal handleClose={handleClose} />
                        </Dialog>

                    </div>
                    <div style={{ padding: "2em 5em 0 5em", display: "flex", justifyContent: "flex-end" }}>
                        <StatusFilterDropdown />
                    </div>
                </div>


                <div style={{ padding: "1em 5em 0 5em" }}>
                    {/* <Paper sx={{ padding: "1em 5em 0 5em", height: 400, width: "80%" }}> */}
                    <DataGrid
                        rows={filteredtodos}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}

                        sx={{
                            border: "2px solid #3A5B8A",
                            backgroundColor: '#ebf0f0',
                            height: 400,
                            color: 'black',
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#c8d0de', // Change this to your desired header color
                                color: '#3A5B8A', // Change this to your desired text color
                            },
                            '& .MuiDataGrid-columnHeaderTitle': {
                                fontWeight: 'bold',

                            },

                        }}
                    />
                    {/* </Paper> */}
                </div>

            </div>
        </TodoTaskContext.Provider>

    );
};

export default ToDoTable;