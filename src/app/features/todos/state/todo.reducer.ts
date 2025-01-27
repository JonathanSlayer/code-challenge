
import { createReducer, on } from '@ngrx/store';
import { initialTodoState } from './todo.state';
import { loadTodosSuccess, setError, setLoading, loadTodoData, createTodo, completeTodoSuccess, createTodoSuccess, deleteTodo, deleteTodoSuccess, completeTodo, searchTodoData, searchTodosSuccess } from './todo.actions';

export const TodoFeatureKey = 'Todo';

export const TodoReducer = createReducer(
  initialTodoState,
  on(setLoading, (state, { isLoading }) => ({ ...state, isLoading })),
  on(setError, (state, { error }) => ({ ...state, error })),

  //load data
  on(loadTodoData, (state) => ({ ...state, isLoading: true })),
  on(loadTodosSuccess, (state, { data }) => ({ ...state, todoList: data, isLoading: false, error: null })),

  //search data
  on(searchTodoData, (state) => ({ ...state, isLoading: true })),
  on(searchTodosSuccess, (state, { data }) => ({ ...state, todoList: data, isLoading: false, error: null })),

  // Create
  on(createTodo, (state) => ({ ...state, isLoading: true })),
  on(createTodoSuccess, (state, { todo }) => (
    { ...state, todoList: [...state.todoList, todo], isLoading: false, error: null }
  )),

  // Complete
  on(completeTodo, (state) => ({ ...state, isLoading: true })),
  on(completeTodoSuccess, (state, { todo }) => (
    { ...state, todoList: state.todoList.map(item => item.id === todo.id ? todo: item), isLoading: false, error: null }
  )),

  // Delete
  on(deleteTodo, (state) => ({ ...state, isLoading: true })),
  on(deleteTodoSuccess, (state, { todoId }) => (
    { ...state, todoList: state.todoList.filter(todo => todo.id != todoId), isLoading: false, error: null }
  ))
);