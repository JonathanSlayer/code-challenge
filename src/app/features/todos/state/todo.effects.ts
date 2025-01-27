import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { completeTodo, completeTodoSuccess, createTodo, createTodoSuccess, deleteTodo, deleteTodoSuccess, loadTodoData, loadTodosSuccess, searchTodoData, searchTodosSuccess, setError } from './todo.actions';
import { switchMap, map, catchError, exhaustMap, debounceTime } from 'rxjs/operators';
import { of } from 'rxjs';
import { TodoService } from '../services/todo/todo.service';
import { ITodo } from '../models/todo.model';

@Injectable()
export class TodoEffects {
    private actions$ = inject(Actions);
    private todoService = inject(TodoService);

    constructor() { }

    loadTodos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTodoData),
            exhaustMap(() =>
                this.todoService.getTodos().pipe(
                    map((data) => {
                        return loadTodosSuccess({ data })
                    }),
                    catchError((error) => of(setError({ error })))
                )
            )
        )
    );

    searchTodo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(searchTodoData),            
            switchMap(({ search }) =>
                this.todoService.searchTodo(search).pipe(
                    map((todos:ITodo[]) => 
                        searchTodosSuccess({ data : todos })
                ),
                    catchError((error) => of(setError({ error })))
                )
            )
        )
    );

    createTodo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createTodo),
            exhaustMap(({ todo }) =>
                this.todoService.createTodo(todo).pipe(
                    map((id:number) => createTodoSuccess({ todo: { ...todo, id } })),
                    catchError((error) => of(setError({ error })))
                )
            )
        )
    );

    completeTodo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(completeTodo),
            switchMap(({ todo }) =>
                this.todoService.completeTodo(todo).pipe(
                    map(() => completeTodoSuccess({ todo })),
                    catchError((error) => of(setError({ error })))
                )
            )
        )
    );

    deleteTodo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTodo),
            exhaustMap(({ todoId }) =>
                this.todoService.deleteTodo(todoId).pipe(
                    map(() => deleteTodoSuccess({ todoId })),
                    catchError((error) => of(setError({ error })))
                )
            )
        )
    );
}