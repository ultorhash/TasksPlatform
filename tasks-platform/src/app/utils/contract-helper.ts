import { BigNumber, Contract, ContractFunction } from "ethers";

const unixMultiplier: number = 1000;

/**
 * Searches for method in contract.
 * @param contract Contract instance.
 * @param name Function name.
 * @returns Contract function.
 */
export const getContractFunction = (contract: Contract, name: string): ContractFunction => {
  return contract.functions[name];
}

/**
 * Creates new date based on provided unix time.
 * @param time Time represented as `BigNumber`.
 * @returns Returns date in `dd/MM/year HH:mm:ss` format.
 */
export const contractTime = (published: BigNumber): string => {
  const date = new Date(published.toNumber() * unixMultiplier);
  const day = date.getUTCDay();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours().toString();
  const minutes = date.getUTCMinutes().toString();
  const seconds = date.getUTCSeconds().toString();

  const fullDate = `${day}/${month}/${year}`;
  const fullTime = `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`

  return `${fullDate} ${fullTime}`;
}
