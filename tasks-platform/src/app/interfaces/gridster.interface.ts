import { GridsterItem } from "angular-gridster2";

export interface IGridsterItemWithId<T> extends GridsterItem {
  id: T;
}
