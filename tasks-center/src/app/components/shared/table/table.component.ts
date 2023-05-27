import { Component, Input, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ITable } from 'src/app/interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<TData> implements OnInit {
  @Input({ required: true }) config: ITable = {} as ITable;
  @Input({ required: true }) columnDefs: ColDef<TData>[] = [];
  @Input({ required: true }) rowData: TData[] = [];

  constructor() {}

  ngOnInit(): void {
    this.setTable();
  }

  setTable(): void {
    const { evenlyColumns } = this.config;

    if (evenlyColumns) {
      this.columnDefs = this.columnDefs.map((c: ColDef<TData>) => {
        return ({ ...c, flex: 1 });
      });
    }
  }
}
