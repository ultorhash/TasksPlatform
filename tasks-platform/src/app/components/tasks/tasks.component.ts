import {
  Component,
  DestroyRef,
  OnInit,
  inject
} from '@angular/core';
import {
  Observable,
  filter,
  forkJoin,
  switchMap,
  tap
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GridsterConfig } from 'angular-gridster2';
import { Select } from '@ngxs/store';
import { ContractService } from '@services';
import { HexString, NewTask, Task } from '@types';
import {
  IForm,
  IGridsterItemWithId,
  IModalData,
  ITable
} from '@interfaces';
import { TaskDashboards } from '@enums';
import { EMPTY_ADDRESS, isDefined } from '@utils';
import { ModalComponent } from '@components/shared';
import { AccountState } from '@store/state';
import {
  addTaskFormInputs,
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

  addTask(): void {
    const dialogRef = this.dialog.open<
      ModalComponent,
      IModalData<NewTask>,
      NewTask
    >(ModalComponent, {
      data: {
        hasForm: true,
        form: this.addTaskForm
      }
    });

    dialogRef.afterClosed().pipe(
      filter(isDefined),
      switchMap(({ name, description, amount }: NewTask) => {
        return this.contractService.addTask$(name, description, amount);
      })
    ).subscribe();
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
