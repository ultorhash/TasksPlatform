import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  public tasks$: any;
  public selectedTask: any;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasks$ = this.tasksService.mockedTasks();
  }

  onClick(task: any): void {
    this.selectedTask = task;
  }
}
