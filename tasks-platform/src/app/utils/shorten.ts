import { HexString } from "../types";

/**
 * Hides the address by showing only the first
 * and last `4` characters separated by ellipsis.
 * @returns Beginning and end of the address
 */
export const shortenAddress = (address: HexString): string => {
  const prefix = address.substring(0, 5);
  const suffix = address.slice(-5);

  return `${prefix}...${suffix}`;
}
