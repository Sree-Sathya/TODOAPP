import { render, fireEvent, screen, getByTestId } from "@testing-library/react";
import StatusFilterDropdown from "./StatusFilterDropdown";
import { TodoTaskContext } from "../ToDoTable";


const mockContextValue = {
    todos: [],
    createTodo: jest.fn(),
    updateTodo: jest.fn(),
    deleteTodo: jest.fn(),
    filterTodo: jest.fn()
}

const mockTodosData = [
    {
        id: "5679-9754",
        taskName: "udemy course",
        description: "TypeScript Module 4",
        status: "Active"
    },
    {
        id: "2779-9754",
        taskName: "Yoga",
        description: "Yoga @6:30",
        status: "Completed"
    }
];



describe("status filter component ", () => {

    beforeEach(() => {
        sessionStorage.clear();
    });

    test("renders correctly", () => {
        render(
            <TodoTaskContext.Provider value={mockContextValue}>
                <StatusFilterDropdown />
            </TodoTaskContext.Provider>
        );

        expect(screen.getByRole("button", { name: /Status Filter/i })).toBeInTheDocument();
    })

    test("opens menu items onclick on button", () => {
        const handleCloseHandler = jest.fn();
        render(
            <TodoTaskContext.Provider value={mockContextValue}>
                <StatusFilterDropdown />
            </TodoTaskContext.Provider>
        );

        const statusFilterBtn = screen.getByRole("button", { name: /Status Filter/i });
        fireEvent.click(statusFilterBtn);
        expect(screen.getAllByRole("checkbox")).toHaveLength(4);


        // fireEvent.click(document);
        // expect(handleCloseHandler).toHaveBeenCalledTimes(1);
        // expect(screen.getByRole("menuitem", { name: "Completed" })).toBeInTheDocument();
        // expect(screen.getByTestId("All")).toBeInTheDocument();

    })



    test("on checkbox click filter data", () => {
        sessionStorage.setItem("todos", JSON.stringify(mockTodosData));

        render(
            <TodoTaskContext.Provider value={mockContextValue}>
                <StatusFilterDropdown />
            </TodoTaskContext.Provider>
        );

        fireEvent.click(screen.getByRole("button", { name: /Status Filter/i }));
        expect(screen.getAllByRole("checkbox")).toHaveLength(4);

        // Check the checkbox

        const completedInput = screen.getByRole('checkbox', { name: /Completed/i });

        fireEvent.click(completedInput);
        expect(completedInput).toBeChecked();

        expect(mockContextValue.filterTodo).toHaveBeenCalledWith("Completed");


    })
})