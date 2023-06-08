import { ColDef } from "ag-grid-community";

/**
 * Configuration for dynamic table.
 */
export interface ITable<TData> {
  columnDefs: ColDef<TData>[];
  rowData: TData[];
}
