export const pasreCamelToKebab = (camelString: string) =>
  camelString.replace(/([A-Z])/m, (camelAlphabet: string) => `-${camelAlphabet.toLowerCase()}`);
