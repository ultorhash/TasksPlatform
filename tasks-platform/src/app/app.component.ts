import { Component } from '@angular/core';
import { HexString } from './types';
import { AlertService, ContractService } from './services';
import { tap } from 'rxjs';
import { shortenAddress } from './utils';
import { AlertTypes } from './enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private account: HexString = '0x';

  constructor(
    private contractService: ContractService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    // this.contractService.getAccount$().pipe(
    //   tap((account: HexString) => {
    //     if (account) {
    //       this.account = account;
    //       this.alertService.alert({
    //         type: AlertTypes.SUCCESS,
    //         message: `Connected to ${shortenAddress(this.account)} account.`
    //       });
    //     } else {
    //       this.alertService.alert({
    //         type: AlertTypes.WARNING,
    //         message: 'Active account not found. Please login to your wallet first.'
    //       });
    //     }
    //   })
    // ).subscribe();
  }
}
