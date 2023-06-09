/**
 * Determines if the specified parameter
 * is different from `null` or `undefined`.
 * @param param Param to check.
 * @returns Provided parameter, otherwise `never`.
 */
export const isDefined = <T>(param: T | null | undefined): param is T extends null | undefined ? never : T => {
  return param !== null && param !== undefined;
}
