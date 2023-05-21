import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from "@angular/forms";

export const hexStringValidator = (): ValidatorFn => {
  const addressLength: number = 42;

  return (control: AbstractControl<string>): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const isValidPrefix = control.value.startsWith("0x");
    const isValidLength = control.value.length === addressLength;

    if (isValidPrefix && isValidLength) {
      return null;
    }

    return {
      address: true
    };
  }
}
