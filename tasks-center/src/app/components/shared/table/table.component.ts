import { Component, Input, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<TData> implements OnInit {
  @Input({ required: true }) columnDefs: ColDef<TData>[] = [];
  @Input({ required: true }) rowData: TData[] = [];

  constructor() {}

  ngOnInit(): void {

  }
}
