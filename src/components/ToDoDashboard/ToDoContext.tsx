
export interface Task {
    id: string;
    taskName: string;
    description: string;
    status: string;
}

export type ToDoContextType = {
    todos: Task[];
    createTodo: (todo: Task) => void;
    updateTodo: (todo: Task) => void;
    deleteTodo: (todo: Task) => void;
    filterTodo: (filterName: string) => void;

}




