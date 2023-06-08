import { HexString } from "@types";

export class SetAccount {
  static readonly type = '[ACCOUNT] Set';
  constructor(public payload: HexString) {}
}
