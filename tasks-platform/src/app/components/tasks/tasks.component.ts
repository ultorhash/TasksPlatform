import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ColDef } from 'ag-grid-community';
import { Observable, tap } from 'rxjs';
import { ContractService } from 'src/app/services';
import { Task } from 'src/app/types';
import { contractTime } from 'src/app/utils';
import { columnDefs } from './tasks.data';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  public rowData: Task[] = [];
  public columnDefs: ColDef<Task>[] = columnDefs;

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
