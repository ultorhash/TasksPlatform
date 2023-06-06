import { NgModule } from "@angular/core";
import { AgGridModule } from 'ag-grid-angular';
import { GridsterModule } from "angular-gridster2";

@NgModule({
  exports: [
    AgGridModule,
    GridsterModule
  ]
})
export class LibraryModule {}
