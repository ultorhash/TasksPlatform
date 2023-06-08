import { Injectable } from "@angular/core";
import {
  Action,
  Selector,
  State,
  StateContext
} from "@ngxs/store";
import { HexString } from "@types";
import { SetAccount } from "@store/actions";
import { EMPTY_ADDRESS } from "@utils";

export class AccountStateModel {
  account: HexString = EMPTY_ADDRESS;
}

@State<AccountStateModel>({
  name: 'account',
  defaults: {
    account: EMPTY_ADDRESS
  }
})
@Injectable({
  providedIn: 'root'
})
export class AccountState {
  @Selector()
  static getAccount(state: AccountStateModel): HexString {
    return state.account;
  }

  @Action(SetAccount)
  setAccount(
    { patchState }: StateContext<AccountStateModel>,
    { payload }: SetAccount
  ): void {
    patchState({
      account: payload
    });
  }
}
