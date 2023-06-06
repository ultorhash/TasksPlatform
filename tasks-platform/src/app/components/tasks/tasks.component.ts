import {
  Component,
  DestroyRef,
  OnInit,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, tap } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { GridsterConfig } from 'angular-gridster2';
import { ContractService } from '@services';
import { Task } from '@types';
import { IGridsterItemWithId } from '@interfaces';
import { Dashboards } from '@enums';
import { columnDefs, dashboard, gridOptions } from './tasks.data';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  public rowData: Task[] = [];
  public columnDefs: ColDef<Task>[] = columnDefs;
  public gridsterOptions: GridsterConfig = gridOptions;
  public dashboard: IGridsterItemWithId<Dashboards>[] = dashboard;
  public dashboards: typeof Dashboards = Dashboards;

  constructor(private contractService: ContractService) {}

  ngOnInit(): void {
    this.fetchData$().subscribe();
  }

  fetchData$(): Observable<Task[]> {
    return this.contractService.getAllTasks$().pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((tasks: Task[]) => {
        this.rowData = tasks;
      })
    );
  }

  add() {
    this.contractService.addTask$("Deployment", "Deploy new server", 70).subscribe();
  }

  onTaskSelect(data: Task): void {
    console.log(data);
  }
}
