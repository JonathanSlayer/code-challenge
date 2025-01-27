import { createAction, props } from '@ngrx/store';
import { ITodo } from '../models/todo.model';

//loading
export const setLoading = createAction('[Todo] Is loading todo data', props<{ isLoading: boolean }>());

//error
export const setError = createAction('[Todo] Error data', props<{ error: string }>());

//Load data
export const loadTodoData = createAction('[Todo] Load todo data', props<{ isLoading: boolean }>());
export const loadTodosSuccess = createAction('[Todo] Load todos success', props<{ data: ITodo[] }>());

//Search data
export const searchTodoData = createAction('[Todo] Search todo data', props<{ isLoading: boolean , search: string | null }>());
export const searchTodosSuccess = createAction('[Todo] Search todos success', props<{ data: ITodo[] }>());

//Create
export const createTodo = createAction('[Todo] Create todo', props<{ todo: ITodo }>());
export const createTodoSuccess = createAction('[Todo] Create todo success', props<{ todo: ITodo }>());

//Delete
export const deleteTodo = createAction('[Todo] Delete todo', props<{ todoId: number }>());
export const deleteTodoSuccess = createAction('[Todo] Delete todo success', props<{ todoId: number }>());

//Complete
export const completeTodo = createAction('[Todo] Complete todo', props<{ todo: ITodo }>());
export const completeTodoSuccess = createAction('[Todo] Complete todo success', props<{ todo: ITodo }>());