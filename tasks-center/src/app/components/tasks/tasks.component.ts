import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Observable, tap } from 'rxjs';
import { ITable } from 'src/app/interfaces';
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
  public tableConfig: ITable = {
    evenlyColumns: true
  };

  public rowData: Task[] = [];
  public columnDefs: ColDef<Task>[] = columnDefs;

  constructor(private contractService: ContractService) {}

  ngOnInit(): void {
    this.fetchData$().subscribe();
  }

  fetchData$(): Observable<Task[]> {
    return this.contractService.getAllTasks$().pipe(
      tap((tasks: Task[]) => {
        this.rowData = tasks;

        console.log(tasks);
        console.log(tasks[0]);
        console.log(contractTime(tasks[0].published));
      }));
  }

  add() {
    this.contractService.addTask$("Deployment", "Deploy new server", 70).subscribe();
  }
}
