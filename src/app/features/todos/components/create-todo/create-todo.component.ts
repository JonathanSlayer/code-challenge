import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ITodo } from '../../models/todo.model';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { noPastDatesValidator } from '../../../../helpers/custom.validator';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTodoComponent implements OnInit {
  @Output() onCreateTodo: EventEmitter<ITodo> = new EventEmitter<ITodo>();
  createForm: FormGroup;
  constructor(private fb: NonNullableFormBuilder) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      title: this.fb.control('', [Validators.required]),
      // dueDate: this.fb.control('', [Validators.required, noPastDatesValidator()]),
      dueDate: this.fb.control('', [Validators.required])        
    });
  }

  create() {
    if (this.createForm.valid) {
      this.onCreateTodo.emit(this.createForm.value as ITodo);
    }
  }

  validatorMessage() {
    const dueDateControl = this.createForm.get('dueDate');
    if (dueDateControl?.hasError('required')) {
      return 'Due date is required.';
    } else if (dueDateControl?.hasError('pastDate')) {
      return 'Date cannot be in the past.';
    } else {
      return null;
    }
  }

}
