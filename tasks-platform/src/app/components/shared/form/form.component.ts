
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IForm } from '@interfaces';
import { FormService } from '@services';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent<T> implements OnInit {
  @Input() form: IForm<T> = {} as IForm<T>;
  @Output() formSubmit: EventEmitter<T> = new EventEmitter<T>();

  public formGroup: FormGroup = {} as FormGroup;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.formGroup = this.formService.getFormGroup(this.form.inputs);
  }

  getError(fieldName: string): string | null {
    const errors = this.formGroup.get(fieldName)?.errors;

    if (errors) {
      return this.formService.getInputError(errors);
    }

    return null;
  }

  onSubmit(): void {
    this.formSubmit.emit(this.formGroup.value);
  }

  onReset(): void {
    this.formGroup.reset();
  }
}
