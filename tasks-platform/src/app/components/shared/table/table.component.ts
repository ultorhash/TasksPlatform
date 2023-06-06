import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  ColDef,
  GridOptions,
  RowClickedEvent
} from 'ag-grid-community';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<TData> {
  @Input({ required: true }) columnDefs: ColDef<TData>[] = [];
  @Input({ required: true }) rowData: TData[] = [];

  @Output() rowClicked: EventEmitter<TData> = new EventEmitter<TData>();

  public gridOptions: GridOptions<TData> = {
    suppressCellFocus: true
  };

  onRowClick(event: RowClickedEvent<TData>): void {
    this.rowClicked.emit(event.data);
  }
}
