import {
  Component,
  DestroyRef,
  OnInit,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, forkJoin, tap } from 'rxjs';
import { GridsterConfig } from 'angular-gridster2';
import { ContractService } from '@services';
import { Task } from '@types';
import { IGridsterItemWithId, ITable } from '@interfaces';
import { TaskDashboards } from '@enums';
import {
  allTasksTable,
  dashboard,
  gridOptions,
  myTasksTable
} from './tasks.data';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  public allTasksTable: ITable<Task> = allTasksTable;
  public myTasksTable: ITable<Task> = myTasksTable;
  public gridsterOptions: GridsterConfig = gridOptions;
  public dashboard: IGridsterItemWithId<TaskDashboards>[] = dashboard;
  public dashboards: typeof TaskDashboards = TaskDashboards;
  public selectedTask: Task | null = null;

  constructor(private contractService: ContractService) {}

  ngOnInit(): void {
    this.fetchData$().subscribe();
  }

  fetchData$(): Observable<[Task[], Task[]]> {
    return forkJoin([
      this.contractService.getAllTasks$(),
      this.contractService.getMyTasks$(),
    ]).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(([allTasks, myTasks]) => {
        this.allTasksTable.rowData = allTasks;
        this.myTasksTable.rowData = myTasks
      })
    );
  }

  add() {
    this.contractService.addTask$("Deployment", "Deploy new server", 70).subscribe();
  }

  deleteTask(task: Task | null): void {
    
  }

  onTaskSelect(task: Task): void {
    this.selectedTask = task;
  }
}
