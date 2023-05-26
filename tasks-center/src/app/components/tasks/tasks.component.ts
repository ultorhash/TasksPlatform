import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/services';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  constructor(private contractService: ContractService) {}

  ngOnInit(): void {
    
  }
}
