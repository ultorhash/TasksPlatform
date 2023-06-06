import { AlertTypes } from "@enums";

interface IAlertOptional {
  duration?: number;
}

export interface IAlert extends IAlertOptional {
  type: AlertTypes;
  message: string;
}
