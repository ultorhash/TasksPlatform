import {
  Component,
  DestroyRef,
  OnInit,
  inject
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, forkJoin, tap } from 'rxjs';
import { GridsterConfig } from 'angular-gridster2';
import { Select } from '@ngxs/store';
import { ContractService } from '@services';
import { HexString, NewTask, Task } from '@types';
import { IForm, IGridsterItemWithId, ITable } from '@interfaces';
import { TaskDashboards } from '@enums';
import { EMPTY_ADDRESS } from '@utils';
import { AccountState } from '@store/state';
import {
  addTaskFormInputs,
  allTasksTable,
  dashboard,
  gridOptions,
  myTasksTable
} from './tasks.data';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @Select(AccountState.getAccount) account$!: Observable<HexString>;

  private destroyRef = inject(DestroyRef);
  private account: HexString = EMPTY_ADDRESS;

  private addTaskForm: IForm<NewTask> = {
    title: 'New task',
    submitText: 'Add',
    inputs: addTaskFormInputs,
    result: {} as NewTask
  }

  public allTasksTable: ITable<Task> = allTasksTable;
  public myTasksTable: ITable<Task> = myTasksTable;
  public gridsterOptions: GridsterConfig = gridOptions;
  public dashboard: IGridsterItemWithId<TaskDashboards>[] = dashboard;
  public dashboards: typeof TaskDashboards = TaskDashboards;
  public selectedTask: Task | null = null;

  constructor(
    private contractService: ContractService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchData$().subscribe();
    this.account$.subscribe((res: HexString) => this.account = res);
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

  addTask(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        hasForm: true,
        form: this.addTaskForm
      }
    });

    dialogRef.afterClosed().subscribe(res => console.log("R:", res));
  }

  deleteTask(task: Task | null): void {
    if (!task) return;
    if (this.isTaskOwner(this.account, task)) {
      this.contractService.deleteTask$(task.id).subscribe();
    }
  }

  onTaskSelect(task: Task): void {
    this.selectedTask = task;
  }

  private isTaskOwner(account: HexString, task: Task): boolean {
    return account.toLowerCase() === task.owner.toLowerCase();
  }
}
