import { Component } from '@angular/core';
import { HexString } from '@types';
import { contractAddress } from '@environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public readonly iconChWidth: number = 8;
  public contractAddress: HexString = contractAddress;
}
