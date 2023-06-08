import {
  ColDef,
  ValueFormatterParams
} from "ag-grid-community";
import { GridsterConfig } from "angular-gridster2";
import { BigNumber } from "ethers";
import { TaskDashboards } from "@enums";
import { IGridsterItemWithId, ITable } from "@interfaces";
import { Task } from "@types";
import { contractTime } from "@utils";

export const allTasksTable: ITable<Task> = {
  columnDefs: [
    {
      headerName: 'Name',
      field: 'name',
      flex: 1,
      sortable: true,
      resizable: true,
      filter: true
    },
    {
      headerName: 'Amount',
      field: 'amount',
      flex: 1,
      sortable: true,
      resizable: true,
      filter: true
    },
    {
      headerName: 'Published',
      field: 'published',
      flex: 1,
      sortable: true,
      resizable: true,
      filter: true,
      cellRenderer: (params: ValueFormatterParams<Task, BigNumber>) => {
        return contractTime(params.value);
      }
    },
    {
      headerName: 'Owner',
      field: 'owner',
      flex: 1,
      sortable: true,
      resizable: true,
      filter: true
    }
  ],
  rowData: []
};

export const myTasksTable: ITable<Task> = {
  columnDefs: [
    {
      headerName: 'Name',
      field: 'name',
      flex: 1,
      sortable: true,
      resizable: true,
      filter: true
    },
    {
      headerName: 'Amount',
      field: 'amount',
      flex: 1,
      sortable: true,
      resizable: true,
      filter: true
    }
  ],
  rowData: []
};

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

export const dashboard: IGridsterItemWithId<TaskDashboards>[] = [
  {
    id: TaskDashboards.ALL_TASKS,
    cols: 20,
    rows: 10,
    x: 0,
    y: 0,
    dragEnabled: true,
    resizeEnabled: true
  },
  {
    id: TaskDashboards.TASK_DETAILS,
    cols: 10,
    rows: 6,
    x: 0,
    y: 10,
    dragEnabled: true,
    resizeEnabled: true
  },
  {
    id: TaskDashboards.MY_TASKS,
    cols: 10,
    rows: 6,
    x: 10,
    y: 10,
    dragEnabled: true,
    resizeEnabled: true
  }
];
