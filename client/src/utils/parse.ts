export const parseCamelToKebab = (camelString: string) =>
  camelString.replace(/([A-Z])/m, (camelAlphabet: string) => `-${camelAlphabet.toLowerCase()}`);

export const parseNumberToMoneyType = (moneylikeNumber: number) => moneylikeNumber.toLocaleString();

export const parseZeroPaddedNumber = (originNumber: number, limit: number) =>
  originNumber.toString().padStart(limit, '0');
