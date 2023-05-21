import { Validators } from "@angular/forms";
import { FormFieldTypes } from "src/app/enums";
import { IFormInput } from "src/app/interfaces";
import { hexStringValidator } from "src/app/utils";

export const formInputs: IFormInput[] = [
  {
    name: 'sender',
    type: FormFieldTypes.TEXT,
    label: 'Sender',
    required: true,
    icon: 'navigate_next',
    validators: [
      Validators.required,
      hexStringValidator()
    ]
  },
  {
    name: 'receiver',
    type: FormFieldTypes.TEXT,
    label: 'Receiver',
    required: true,
    icon: 'navigate_before',
    validators: [
      Validators.required,
      hexStringValidator()
    ]
  },
  {
    name: 'amount',
    type: FormFieldTypes.NUMBER,
    label: 'Token Amount',
    required: true,
    icon: 'attach_money',
    validators: [
      Validators.required,
      Validators.min(0.005)
    ]
  },
  {
    name: 'message',
    type: FormFieldTypes.TEXT,
    label: 'Message',
    required: true,
    icon: 'article',
    validators: [Validators.required]
  },
  {
    name: 'keyword',
    type: FormFieldTypes.TEXT,
    label: 'Keyword',
    required: true,
    icon: 'label_outline',
    validators: [Validators.required]
  }
];
