import { render, screen, fireEvent, getByRole } from "@testing-library/react";
import EditIcon from "./EditIcon";
import { TodoTaskContext } from "../ToDoTable";


const mockContextValue = {
    todos: [],
    createTodo: jest.fn(),
    updateTodo: jest.fn(),
    deleteTodo: jest.fn(),
    filterTodo: jest.fn()
}



describe("Edit Icon button dialog component", () => {
    const currentMockData = {
        id: "5679-9754",
        taskName: "udemy course",
        description: "TypeScript Module 4",
        status: "Completed"
    };

    test("renders correctly", () => {

        render(
            <TodoTaskContext.Provider value={mockContextValue}>
                <EditIcon currentRowData={currentMockData} />
            </TodoTaskContext.Provider>
        );
        expect(screen.getByTestId(/edit-icon/i)).toBeInTheDocument();
    })

    test("on click on edit button dialog opens", () => {
        render(
            <TodoTaskContext.Provider value={mockContextValue}>
                <EditIcon currentRowData={currentMockData} />
            </TodoTaskContext.Provider>
        );

        fireEvent.click(screen.getByTestId("edit-icon"));

        //check if modal window opens

        expect(screen.getByRole("heading")).toHaveTextContent("Update Task");

    })








})


