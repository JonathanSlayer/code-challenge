import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-todo',
  templateUrl: './search-todo.component.html',
  styleUrl: './search-todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchTodoComponent implements OnInit {
  @Output() onSearchTodo: EventEmitter<string> = new EventEmitter<string>();
  searchControl = new FormControl('');
  constructor() { }

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe(value => {
      this.onSearchTodo.emit(value);
    });
  }  
}
