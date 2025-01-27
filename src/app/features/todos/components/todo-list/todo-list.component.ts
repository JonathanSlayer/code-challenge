import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { selectLoading, selectTodoData } from '../../state/todo.selectors';
import { Store } from '@ngrx/store';
import { setLoading } from '../../../../global-state/global.actions';
import { ITodo } from '../../models/todo.model';
import { completeTodo, createTodo, deleteTodo, loadTodoData, searchTodoData } from '../../state/todo.actions';
import { TodoService } from '../../services/todo/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  @HostBinding('class.todo-list') todoList = true;
  todos$: Observable<ITodo[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.store.dispatch(loadTodoData({ isLoading: true }));
    this.todos$ = this.store.select(selectTodoData);
    this.loading$ = this.store.select(selectLoading);
  }

  onCompleteTodo(todo: ITodo) {
    this.store.dispatch(completeTodo({ todo: todo }))
  }

  onDeleteTodo(todoId: number) {
    this.store.dispatch(deleteTodo({ todoId: todoId }));
  }

  onSearchTodo(search: string) {
    this.store.dispatch(searchTodoData({ isLoading: true, search: search }))
  }

  onCreateTodo(todo: ITodo) {
    this.store.dispatch(createTodo({ todo: todo }));
  }
}
