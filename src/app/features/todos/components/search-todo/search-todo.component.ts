import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-todo',
  templateUrl: './search-todo.component.html',
  styleUrl: './search-todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchTodoComponent implements OnInit , OnDestroy {
  @Output() onSearchTodo: EventEmitter<string> = new EventEmitter<string>();
  searchControl = new FormControl('');
  private destroyed$ :Subject<any> = new Subject();
  constructor() { } 

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(value => {
      this.onSearchTodo.emit(value);
    });
  }  

  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }
}
