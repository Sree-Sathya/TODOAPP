import { render, fireEvent, screen } from "@testing-library/react";
import DeleteIcon from "./DeleteIcon";
import { TodoTaskContext } from "../ToDoTable";

const mockContextValue = {
    todos: [],
    createTodo: jest.fn(),
    updateTodo: jest.fn(),
    deleteTodo: jest.fn(),
    filterTodo: jest.fn(),
}
const mockData = {
    id: "238-234",
    taskName: "udemy",
    description: "Typescript module 4",
    status: "Active"
};

describe("delete icon component", () => {

    test("renders correctly", () => {

        render(
            <TodoTaskContext.Provider value={mockContextValue}>
                <DeleteIcon currentRowData={mockData} />
            </TodoTaskContext.Provider>
        );

        expect(screen.getByTestId("delete")).toBeInTheDocument();

    })

    test("delete row on click on delete", () => {



        render(
            <TodoTaskContext.Provider value={mockContextValue}>
                <DeleteIcon currentRowData={mockData} />
            </TodoTaskContext.Provider>
        );

        fireEvent.click(screen.getByTestId("delete"));
        expect(mockContextValue.deleteTodo).toHaveBeenCalledWith({
            id: "238-234",
            taskName: "udemy",
            description: "Typescript module 4",
            status: "Active"
        });

    })
})