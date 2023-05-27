import { ColDef, ValueFormatterParams } from "ag-grid-community";
import { BigNumber } from "ethers";
import { HexString, Task } from "src/app/types";
import { contractTime, shortenAddress } from "src/app/utils";

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
