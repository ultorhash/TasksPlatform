import { ColDef, ValueFormatterParams } from "ag-grid-community";
import { BigNumber } from "ethers";
import { HexString, Task } from "src/app/types";
import { contractTime, shortenAddress } from "src/app/utils";

export const columnDefs: ColDef<Task>[] = [
  {
    headerName: 'Name',
    field: 'name'
  },
  {
    headerName: 'Amount',
    field: 'amount'
  },
  {
    headerName: 'Published',
    field: 'published',
    cellRenderer: (params: ValueFormatterParams<Task, BigNumber>) => {
      return contractTime(params.value);
    }
  },
  {
    headerName: 'Owner',
    field: 'owner'
  }
];
