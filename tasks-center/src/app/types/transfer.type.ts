import { HexString } from "./hex-address.type"

export type TransferDto = {
  sender: HexString;
  receiver: HexString;
  amount: number;
  message: string;
  keyword: string;
}
