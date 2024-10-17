import { render, screen, fireEvent } from "@testing-library/react";
import CreateTodoModal from "./CreateTodoModal";
import { TodoTaskContext } from "../ToDoTable";
import { v4 as uuidv4 } from "uuid";


// interface createModalProps {
//     handleCloseMock: () => void;
// };

const mockContextValue = {
    todos: [],
    createTodo: jest.fn(),
    updateTodo: jest.fn(),
    deleteTodo: jest.fn(),
    filterTodo: jest.fn()
}


// Mock the uuid function

jest.mock('uuid', () => ({
    v4: jest.fn(),
}))


describe("create Modal form", () => {

    test("renders correctly", () => {
        const handleCloseHandler = jest.fn();
        render(
            <TodoTaskContext.Provider value={mockContextValue}>
                <CreateTodoModal handleClose={handleCloseHandler} />
            </TodoTaskContext.Provider>

        );
        expect(screen.getByRole("heading")).toHaveTextContent("Create Task");

        expect(screen.getByLabelText(/Task Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();

        expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();


    })

    test("saves data on click save", () => {

        const handleCloseHandler = jest.fn();
        (uuidv4 as jest.Mock).mockReturnValue("67890-2878");

        render(
            <TodoTaskContext.Provider value={mockContextValue}>
                <CreateTodoModal handleClose={handleCloseHandler} />
            </TodoTaskContext.Provider>
        );
        const saveBtn = screen.getByRole("button", { name: /Save/i });
        expect(saveBtn).toBeInTheDocument();

        // add data to the fields
        fireEvent.change(screen.getByLabelText(/Task Name/i), { target: { value: "udemy course" } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: "Typescript module4" } });

        fireEvent.mouseDown(screen.getByLabelText(/Status/i));
        fireEvent.click(screen.getByText(/Active/i));

        // add row
        fireEvent.click(saveBtn);


        expect(mockContextValue.createTodo).toHaveBeenCalledWith({
            "id": "67890-2878", "taskName": "udemy course", "description": "Typescript module4", "status": "Active"
        });
        // // modal window disappears
        // expect(saveBtn).toBeInTheDocument();
    })

    test("close button is clicked", () => {
        const handleCloseHandler = jest.fn();

        render(
            <TodoTaskContext.Provider value={mockContextValue}>
                <CreateTodoModal handleClose={handleCloseHandler} />
            </TodoTaskContext.Provider>
        );
        const closebtn = screen.getByRole("button", { name: /close/i });
        expect(closebtn).toBeInTheDocument();

        // click close

        fireEvent.click(closebtn);
        expect(handleCloseHandler).toHaveBeenCalledTimes(1);



    })
})
