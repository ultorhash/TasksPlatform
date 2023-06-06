import { Injectable } from "@angular/core";
import { IFormInput } from "@interfaces";
import { FormControl, FormGroup, ValidationErrors } from "@angular/forms";
import { FormFieldErrors } from "@enums";

@Injectable({
  providedIn: 'root'
})
export class FormService {
  getFormGroup(formInputs: IFormInput[]): FormGroup {
    const group: { [key: string]: FormControl } = {};

    formInputs.forEach(input => {
      group[input.name] = new FormControl('', input.validators);
    });

    return new FormGroup(group);
  }

  getInputError(errors: ValidationErrors): string {
    const error = Object.keys(errors)[0];

    switch (error) {
      case 'required':
        return FormFieldErrors.REQUIRED;
      case 'address':
        return FormFieldErrors.ADDRESS;
      case 'min':
        return FormFieldErrors.AMOUNT;
      default:
        return 'Error';
    }
  }
}
