import { IForm } from "@interfaces";

export interface IModalData<TData> {
  hasForm: boolean;
  form: IForm<TData>
}
