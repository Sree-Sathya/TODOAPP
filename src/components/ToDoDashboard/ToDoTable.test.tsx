import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import ToDoTable from "./ToDoTable";
import TodoTaskContext from "./ToDoTable";
import { Task, ToDoContextType } from "./ToDoContext";



const mockContextValue = {
    todos: [],
    createTodo: jest.fn(),
    updateTodo: jest.fn(),
    deleteTodo: jest.fn(),
    filterTodo: jest.fn(),
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


describe("ToDo Dashboard", () => {

    beforeEach(() => {
        sessionStorage.clear();
    });

    test("renders correctly", () => {

        render(
            <TodoTaskContext>
                <ToDoTable />
            </TodoTaskContext>
        );
        expect(screen.getByRole("button", { name: "Add Task" })).toBeInTheDocument();
        expect(screen.getByText(/Task Name/i)).toBeInTheDocument();
        expect(screen.getByText(/Status Filter/i)).toBeInTheDocument();
        // expect(mockContextValue.updateTodo).toBeInTheDocument();
    })

    test("check if there is any local storage", () => {

        sessionStorage.setItem("todos", JSON.stringify(mockTodosData));
        render(
            <TodoTaskContext>
                <ToDoTable />
            </TodoTaskContext>
        );

        const storedValue = sessionStorage.getItem(" todos");

        if (storedValue) {
            const parsedValue = JSON.parse(storedValue)
            expect(parsedValue).toEqual(mockTodosData);
        }


    })

    test("opens create dialog on open and closes on close", () => {
        render(
            <TodoTaskContext>
                <ToDoTable />
            </TodoTaskContext>
        );
        const createTaskEle = screen.queryByText(/Create Task/i);
        expect(createTaskEle).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: /Add Task/i }));
        expect(screen.getByRole("heading")).toHaveTextContent("Create Task");
        // expect(createTaskEle).toBeInTheDocument()

        fireEvent.click(screen.getByRole('button', { name: /close/i }));

        // const ele = screen.getByRole("button", { name: /Save/i })
        // expect(ele).not.toBeInTheDocument()
        expect(createTaskEle).not.toBeInTheDocument();
    })

    test("renders Data Grid Component with no initial data", () => {

        render(
            <TodoTaskContext>
                <ToDoTable />
            </TodoTaskContext>
        );
        expect(screen.queryByText(/Task Name/i)).toBeInTheDocument();
    })

    test("Adds a new row when Add Task is clicked", () => {

        render(
            <TodoTaskContext>
                <ToDoTable />
            </TodoTaskContext>
        );
        fireEvent.click(screen.getByRole("button", { name: /Add Task/i }));
        expect(screen.getByRole("heading")).toHaveTextContent("Create Task");

        // add data to the fields
        fireEvent.change(screen.getByLabelText(/Task Name/i), { target: { value: "udemy course" } });
        fireEvent.change(screen.getByLabelText(/Description /i), { target: { value: "typescript module4" } });

        fireEvent.mouseDown(screen.getByLabelText(/Status/i));
        fireEvent.click(screen.getByText(/Active/i));

        // add row
        fireEvent.click(screen.getByRole("button", { name: /Save/i }));

        expect(screen.getByText(/udemy course/i)).toBeInTheDocument();

    })

    test("check if update todo is working or not", () => {

        sessionStorage.setItem("todos", JSON.stringify(mockTodosData));

        const currentMockData = [{
            id: "5679-9754",
            taskName: "udemy",
            description: "TypeScript Module 4",
            status: "Completed"
        },
        {
            id: "2779-9754",
            taskName: "Yoga",
            description: "Yoga @6:30",
            status: "Completed"
        }];

        render(
            <TodoTaskContext {...mockContextValue}>
                <ToDoTable />
            </TodoTaskContext>
        );

        const ele = screen.getAllByTestId("edit-icon");
        fireEvent.click(ele[0]);

        const TaskNameField = screen.getByLabelText(/Task Name/i);
        fireEvent.change((TaskNameField), { target: { value: "udemy" } });

        fireEvent.click(screen.getByRole("button", { name: /Save/i }));

        expect(screen.getByText(/udemy/i)).toBeInTheDocument();

        sessionStorage.setItem("todos", JSON.stringify(currentMockData));

        const storedValue = sessionStorage.getItem(" todos");

        if (storedValue) {
            const parsedValue = JSON.parse(storedValue)
            expect(parsedValue).toEqual(currentMockData);
        }

    })
    test("check if delete todo is working or not", () => {
        sessionStorage.setItem("todos", JSON.stringify(mockTodosData));

        render(
            <TodoTaskContext {...mockContextValue}>
                <ToDoTable />
            </TodoTaskContext>
        );

        const ele = screen.getAllByTestId("delete");


        fireEvent.click(ele[0]);

        expect(screen.queryByText(/udemy course/i)).not.toBeInTheDocument();

    })

    test("check if filterTodo function is working or not", () => {

        sessionStorage.setItem("todos", JSON.stringify(mockTodosData));
        render(
            <TodoTaskContext {...mockContextValue}>
                <ToDoTable />
            </TodoTaskContext>
        );

        fireEvent.click(screen.getByRole("button", { name: /Status Filter/i }));
        expect(screen.getAllByRole("checkbox")).toHaveLength(4);

        const filteredMockData = [
            {
                id: "2779-9754",
                taskName: "Yoga",
                description: "Yoga @6:30",
                status: "Completed"
            }
        ];

        //  filter -completed
        const completedInput = screen.getByRole('checkbox', { name: /Completed/i });
        fireEvent.click(completedInput);
        expect(completedInput).toBeChecked();

        // filter - All

        const allInput = screen.getByRole('checkbox', { name: /All/i });
        fireEvent.click(allInput);
        expect(allInput).toBeChecked();

    })

})