import { Contract, ContractFunction } from "ethers";

/**
 * Searches for method in contract.
 * @param contract Contract instance.
 * @param name Function name.
 * @returns Contract function.
 */
export const getFunction = (contract: Contract, name: string): ContractFunction => {
  return contract.functions[name];
}
