import { ColDef, ValueFormatterParams } from "ag-grid-community";
import { GridsterConfig } from "angular-gridster2";
import { BigNumber } from "ethers";
import { Dashboards } from "@enums";
import { IGridsterItemWithId } from "@interfaces";
import { Task } from "@types";
import { contractTime } from "@utils";

export const columnDefs: ColDef<Task>[] = [
  {
    headerName: 'Name',
    field: 'name',
    flex: 1,
    sortable: true,
    resizable: true
  },
  {
    headerName: 'Amount',
    field: 'amount',
    flex: 1,
    sortable: true,
    resizable: true
  },
  {
    headerName: 'Published',
    field: 'published',
    flex: 1,
    sortable: true,
    resizable: true,
    cellRenderer: (params: ValueFormatterParams<Task, BigNumber>) => {
      return contractTime(params.value);
    }
  },
  {
    headerName: 'Owner',
    field: 'owner',
    flex: 1,
    sortable: true,
    resizable: true
  }
];

export const gridOptions: GridsterConfig = {
  resizable: {
    enabled: true
  },
  draggable: {
    enabled: true,
    ignoreContentClass: 'card-content',
  },
  gridType: 'fit',
  displayGrid: 'always',
  swap: true,
  setGridSize: true
};

export const dashboard: IGridsterItemWithId<Dashboards>[] = [
  {
    id: Dashboards.TABLE,
    cols: 10,
    rows: 4,
    x: 0,
    y: 0,
    dragEnabled: true,
    resizeEnabled: true
  },
  {
    id: Dashboards.DETAILS,
    cols: 4,
    rows: 4,
    x: 0,
    y: 5,
    dragEnabled: true,
    resizeEnabled: true
  }
];
