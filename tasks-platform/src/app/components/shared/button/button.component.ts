import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input({ required: true }) text: string = "";
  @Input() disabled: boolean = false;
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() type: 'text' | 'submit' | 'reset' = 'text';
  @Input() matType: 'raised' | 'stroked' | 'flat' | 'menu' = 'raised';

  @Output() click: EventEmitter<void> = new EventEmitter<void>();
}
