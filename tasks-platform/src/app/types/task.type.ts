import { BigNumber } from "ethers";
import { HexString } from "./hex-address.type";

export type Task = {
  id: BigNumber;
  name: string;
  description: string;
  amount: BigNumber;
  owner: HexString;
  isTaken: boolean;
  takenBy: HexString;
  published: BigNumber;
}

export type NewTask = Pick<Task, 'name' | 'description' | 'amount'>;
