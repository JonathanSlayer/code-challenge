import { inject, Injectable } from '@angular/core';
import { ITodo } from '../../models/todo.model';
import { IndexedDbService } from '../../../../serverMock/todo.api';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private indexedDbService = inject(IndexedDbService);
  constructor() { }

  getTodos(): Observable<ITodo[]> {
    return from(this.indexedDbService.getAllRecords())
  }

  searchTodo(search: string): Observable<ITodo[]> {
    if (search) {
      return from(this.indexedDbService.getAllRecords()).pipe(       
        map(todos =>
          todos.filter(todo => {
            const title = todo.title.toLowerCase();
            return title.includes(search.toLowerCase());
          })
        )
      );
    }
    return this.getTodos();
  }

  createTodo(todo: ITodo): Observable<IDBValidKey> {
    return from(this.indexedDbService.addRecord(todo))
  }

  completeTodo(todo: ITodo): Observable<void> {
    return from(this.indexedDbService.updateRecord(todo))
  }

  deleteTodo(todo: IDBValidKey): Observable<void> {
    return from(this.indexedDbService.deleteRecord(todo))
  }
}
