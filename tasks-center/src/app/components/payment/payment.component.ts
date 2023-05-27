import { Component } from '@angular/core';
import { IForm } from 'src/app/interfaces';
import { formInputs } from './payment.data';
import { TransferDto } from 'src/app/types';
import { AlertService, EthereumService } from 'src/app/services';
import { AlertTypes } from 'src/app/enums';
import { tap } from 'rxjs';
import { BigNumber } from 'ethers';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  public form: IForm<TransferDto> = {
    inputs: formInputs,
    result: {} as TransferDto
  }

  constructor(
    private ethereumService: EthereumService,
    private alertService: AlertService
  ) {}

  onSubmit(data: TransferDto): void {
    const { sender, receiver, amount, message, keyword } = data;

    this.ethereumService.transfer$(
      sender,
      receiver,
      amount,
      message,
      keyword
    ).pipe(
      tap((count: BigNumber[]) => {
        const transactionCount = parseInt(count[0]._hex, 16);
        this.alertService.alert({
          type: AlertTypes.INFO,
          message: `Contract has now registered ${transactionCount} transactions.`,
          duration: 2000
        });
      }),
    ).subscribe();
  }
}
