import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  HomeComponent,
  TasksComponent
} from '@components';

const title: string = "Tasks Platform";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: `${title} | Home`
  },
  {
    path: 'tasks',
    component: TasksComponent,
    title: `${title} | Tasks`
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
