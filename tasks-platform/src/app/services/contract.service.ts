import { Injectable } from "@angular/core";
import {
  Observable,
  from,
  map,
  switchMap,
  tap
} from "rxjs";
import { Contract, ethers, providers } from "ethers";
import { AlertService } from "./alert.service";
import { contractABI, contractAddress } from "../environment";
import { HexString, Task } from "../types";
import { AlertTypes, EthereumMethods } from "../enums";
import { getContractFunction, shortenAddress } from "../utils";

declare global {
  interface Window {
    ethereum: import('ethers').providers.ExternalProvider
  }
}

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private readonly ethereum: ethers.providers.ExternalProvider = window.ethereum;
  private readonly contract: Contract;

  constructor(private alertService: AlertService) {
    this.contract = this.getContract();
  }

  private getContract(): Contract {
    const provider = new providers.Web3Provider(this.ethereum);
    const signer = provider.getSigner();

    return new Contract(contractAddress, contractABI, signer);
  }

  connectWallet$(): Observable<HexString> {
    return from(this.ethereum.request!({ method: EthereumMethods.REQUEST_ACCOUNTS }))
      .pipe(
        map((accounts: HexString[]) => accounts[0])
      );
  }

  getAccount$(): Observable<HexString> {
    return from(this.ethereum.request!({ method: EthereumMethods.ACCOUNTS }))
      .pipe(
        map((addresses: HexString[]) => addresses[0])
      );
  }

  addTask$(name: string, description: string, amount: number): Observable<any> {
    return from(
      getContractFunction(this.contract, "addTask")(name, description, amount)
    ).pipe(
      switchMap((hash: providers.TransactionResponse) => from(hash.wait())),
      tap((receipt: providers.TransactionReceipt) => {
        this.alertService.alert({
          type: AlertTypes.SUCCESS,
          message: `Task added successfully on ${shortenAddress(receipt.to as HexString)}`
        });
      })
    );
  }

  getAllTasks$(): Observable<Task[]> {
    return from(getContractFunction(this.contract, "getAllTasks")()).pipe(
      map((res: Array<Array<Task>>) => res[0])
    );
  }
}
