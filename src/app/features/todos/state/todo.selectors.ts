import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TodoState } from './todo.state';
import { TodoFeatureKey } from './todo.reducer';

const selectTodos = createFeatureSelector<TodoState>(TodoFeatureKey);
export const selectTodoData = createSelector(selectTodos, (state) => state.todoList);
export const selectLoading = createSelector(selectTodos, (state) => state.isLoading);