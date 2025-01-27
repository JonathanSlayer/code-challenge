import { ITodo } from "../models/todo.model";

export interface TodoState {
    todoList: ITodo[];
    isLoading: boolean;
    error: string | null;
}

export const initialTodoState: TodoState = {
    todoList: [],
    isLoading: false,
    error: null
};