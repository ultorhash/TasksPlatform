import { Injectable } from '@angular/core';
import {
  EMPTY,
  Observable,
  catchError,
  from,
  map,
  switchMap,
  tap
} from 'rxjs';
import {
  Contract,
  ethers,
  providers,
  BigNumber
} from 'ethers';
import { AlertService } from './alert.service';
import { contractABI, contractAddress } from '../environment';
import { AlertTypes, EthereumMethods } from '../enums';
import { HexString, TransferError } from '../types';
import { getFunction, shortenAddress } from '../utils';

declare global {
  interface Window {
    ethereum: import('ethers').providers.ExternalProvider
  }
}

@Injectable({
  providedIn: 'root'
})
export class EthereumService {
  private readonly GAS_FEE_IN_GWEI: string = '0x5208';
  private ethereum: ethers.providers.ExternalProvider = window.ethereum;

  constructor(private alertService: AlertService) {}

  getContract(): Contract {
    const provider = new providers.Web3Provider(this.ethereum);
    const signer = provider.getSigner();

    return new Contract(contractAddress, contractABI, signer);
  }

  getAccount$(): Observable<HexString> {
    console.log
    return from(this.ethereum.request!({ method: EthereumMethods.ACCOUNTS }))
      .pipe(
        map((addresses: HexString[]) => addresses[0])
      );
  }

  connectWallet$(): Observable<HexString> {
    return from(this.ethereum.request!({ method: EthereumMethods.REQUEST_ACCOUNTS }))
      .pipe(
        map((accounts: HexString[]) => accounts[0])
      );
  }

  transfer$(
    sender: HexString,
    receiver: HexString,
    amount: number,
    message: string,
    keyword: string
  ): Observable<BigNumber[]> {
    const contract: Contract = this.getContract();
    const parsedAmount: BigNumber = ethers.utils.parseEther(amount.toString());

    const transfer$: Observable<unknown> = from(this.ethereum.request!({
      method: EthereumMethods.SEND_TRANSACTION,
      params: [{
        from: sender,
        to: receiver,
        gas: this.GAS_FEE_IN_GWEI,
        value: parsedAmount._hex
      }]
    }));

    return transfer$.pipe(
      switchMap(() => {
        return from(
          getFunction(contract, "addToBlockchain")(receiver, parsedAmount, message, keyword)
        );
      }),
      switchMap((hash: providers.TransactionResponse) => from(hash.wait())),
      tap((receipt: providers.TransactionReceipt) => {
        this.alertService.addAlert({
          type: AlertTypes.SUCCESS,
          message: `Transaction added on ${shortenAddress(receipt.to as HexString)}.`,
          duration: 10_000
        });
      }),
      switchMap(() => from(getFunction(contract, "getTransactionCount")())),
      catchError((err: TransferError) => {
        this.alertService.addAlert({
          type: AlertTypes.ERROR,
          message: `Transaction denied. Error: ${err}`
        });

        return EMPTY;
      })
    );
  }
}
