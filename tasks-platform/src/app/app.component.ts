import { Component } from '@angular/core';
import { ContractService } from '@services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private contractService: ContractService) {}

  ngOnInit(): void {
    this.contractService.getAccount$().subscribe();
  }
}
