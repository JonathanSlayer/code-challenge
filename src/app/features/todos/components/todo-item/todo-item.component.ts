import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { ITodo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {
  @HostBinding('style.height') height = '13em';
  @Input() item: ITodo;
  @Output() onDeleteTodo = new EventEmitter<number>();
  @Output() onCompleteTodo = new EventEmitter<ITodo>();

  displayMessage(todo: ITodo) {
    return todo.completed ? 'Completed' : this.checkPastDue(todo) ? 'Past due' : 'Pending';
  }

  onCheckboxChange(completed: boolean, todo: ITodo): void {    
    const updatedItem = { ...todo, completed };  
    this.onCompleteTodo.emit(updatedItem);
  }

  checkPastDue(todo: ITodo){
    return todo.dueDate < new Date();
  }
}
