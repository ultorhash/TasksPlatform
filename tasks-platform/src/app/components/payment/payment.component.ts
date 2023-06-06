import { Component } from '@angular/core';
import { IForm } from '@interfaces';
import { TransferDto } from '@types';
import { AlertService, ContractService } from '@services';
import { AlertTypes } from '@enums';
import { formInputs } from './payment.data';
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
    private contractService: ContractService,
    private alertService: AlertService
  ) {}

  onSubmit(data: TransferDto): void {
    const { sender, receiver, amount, message, keyword } = data;
  }
}
