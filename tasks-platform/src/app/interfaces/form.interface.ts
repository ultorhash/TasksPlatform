import { ValidatorFn } from "@angular/forms";

/**
 * Optional properties for dynamic form input.
 */
interface IFormInputOptional {
  icon?: string;
  disabled?: boolean;
}

/**
 * Defines all texts for form
 */
interface IFormTypography {
  title: string;
  submitText: string;
}

/**
 * Input for dynamic form.
 */
export interface IFormInput extends IFormInputOptional {
  name: string;
  type: string;
  label: string;
  required: boolean;
  validators: ValidatorFn[];
}

/**
 * Specifies configuration for dynamic form.
 */
export interface IForm<TResult> extends IFormTypography {
  inputs: IFormInput[];
  result: TResult;
}
