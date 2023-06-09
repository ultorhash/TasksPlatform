import { Validators } from "@angular/forms";
import { ValueFormatterParams } from "ag-grid-community";
import { GridsterConfig } from "angular-gridster2";
import { BigNumber } from "ethers";
import { FormFieldTypes, TaskDashboards } from "@enums";
import { IFormInput, IGridsterItemWithId, ITable } from "@interfaces";
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

export const addTaskFormInputs: IFormInput[] = [
  {
    name: 'name',
    type: FormFieldTypes.TEXT,
    label: 'Name',
    required: true,
    icon: 'edit_square',
    validators: [Validators.required]
  },
  {
    name: 'description',
    type: FormFieldTypes.TEXT,
    label: 'Description',
    required: true,
    icon: 'description',
    validators: [Validators.required]
  },
  {
    name: 'amount',
    type: FormFieldTypes.NUMBER,
    label: 'Amount',
    required: true,
    icon: 'payments',
    validators: [
      Validators.required,
      Validators.min(0.005)
    ]
  }
];
