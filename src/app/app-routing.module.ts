import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo:'/todo'},
  { path: 'todo', component: TodoComponent },
  { path: 'addTask', component: AddTaskComponent },
  { path: '**', redirectTo:'/todo'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
