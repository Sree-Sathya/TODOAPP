import { render, screen, fireEvent } from "@testing-library/react";
import EditFormModal from "./EditFormModal";
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

describe("edit Modal Window", () => {


    const currentMockData = {
        id: "5679-9754",
        taskName: "udemy course",
        description: "TypeScript Module 4",
        status: "Completed"
    };



    test("Renders Correctly", () => {
        const handleCloseHandler = jest.fn();
        render(
            <TodoTaskContext.Provider value={mockContextValue}>
                <EditFormModal handleClose={handleCloseHandler} data={currentMockData} />
            </TodoTaskContext.Provider>
        );

        expect(screen.getByRole("heading")).toHaveTextContent("Update Task");

        expect(screen.getByLabelText(/Task Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();

        //check if buttons are rendered are not

        expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();

    })

    test("Modify the fields on change  and on save click", () => {

        sessionStorage.setItem("todos", JSON.stringify(mockTodosData));

        const handleCloseHandler = jest.fn();
        const handleFormHandler = jest.fn();

        render(
            <TodoTaskContext.Provider value={mockContextValue}>
                <EditFormModal handleClose={handleCloseHandler} data={currentMockData} />
            </TodoTaskContext.Provider>
        );


        expect(screen.getByRole("heading")).toHaveTextContent("Update Task");

        const TaskNameField = screen.getByLabelText(/Task Name/i);
        const DescriptionField = screen.getByLabelText(/Description/i);
        const StatusField = screen.getByLabelText(/Status/i);

        // check data for the fields

        expect(TaskNameField).toHaveValue("udemy course");
        expect(DescriptionField).toHaveValue("TypeScript Module 4");
        expect(StatusField).toHaveTextContent("Completed");

        // change the data in the fields

        fireEvent.change((TaskNameField), { target: { value: "udemy" } });

        // expect(handleFormHandler).to


        fireEvent.mouseDown(screen.getByLabelText(/Status/i));
        fireEvent.click(screen.getByText("Not Started"));


        const newMockData = [{
            id: "5679-9754",
            taskName: "udemy",
            description: "TypeScript Module 4",
            status: "Not Started"
        },
        {
            id: "2779-9754",
            taskName: "Yoga",
            description: "Yoga @6:30",
            status: "Completed"
        }];

        // check whether data is modified or not
        expect(TaskNameField).toHaveValue("udemy");
        expect(StatusField).toHaveTextContent("Not Started");

        // save the data
        fireEvent.click(screen.getByRole("button", { name: "Save" }));

        expect(mockContextValue.updateTodo).toHaveBeenCalledWith({
            id: "5679-9754",
            taskName: "udemy",
            description: "TypeScript Module 4",
            status: "Not Started"
        });

        // check empty field
        fireEvent.change(TaskNameField, { target: { value: '' } });
        expect(TaskNameField).toHaveValue('');

        fireEvent.change(DescriptionField, { target: { value: '' } });
        expect(DescriptionField).toHaveValue('');

        // check session storage 
        sessionStorage.setItem("todos", JSON.stringify(newMockData));

        const storedValue = sessionStorage.getItem(" todos");

        if (storedValue) {
            const parsedValue = JSON.parse(storedValue)
            expect(parsedValue).toEqual(newMockData);
        }

        expect(handleCloseHandler).toHaveBeenCalledTimes(1);

    })


    test("close model window on click on close", () => {

        const handleCloseHandler = jest.fn();

        render(
            <TodoTaskContext.Provider value={mockContextValue}>
                <EditFormModal handleClose={handleCloseHandler} data={currentMockData} />
            </TodoTaskContext.Provider>
        );

        expect(screen.getByRole("heading")).toHaveTextContent(/Update Task/i);

        // click on close button
        fireEvent.click(screen.getByRole("button", { name: /close/i }));
        expect(handleCloseHandler).toHaveBeenCalledTimes(1);


    })
})