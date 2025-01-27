import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { StoreModule } from '@ngrx/store';
import { TodoFeatureKey, TodoReducer } from './state/todo.reducer';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { SearchTodoComponent } from './components/search-todo/search-todo.component';
import { IconsProviderModule } from '../../icons-provider.module';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './state/todo.effects';
import { LoadingComponent } from '../../shared/loading/loading.component';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoItemComponent,
    CreateTodoComponent,
    SearchTodoComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    LoadingComponent,
    NzCardModule,
    NzBadgeModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzTimePickerModule,
    IconsProviderModule,   
    NzToolTipModule,
    NzCheckboxModule,
    FormsModule,
    StoreModule.forFeature(TodoFeatureKey, TodoReducer), 
    EffectsModule.forFeature([TodoEffects])   
  ]
})
export class TodoModule { }
