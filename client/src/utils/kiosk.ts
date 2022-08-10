import { temperature } from '../constants/temperature';

export const getTemperature = (isIce: boolean) => (isIce ? temperature.ICED : temperature.HOT);

export const calcTotalPriceBySurcharge = ({
  amount,
  originPrice,
  surcharge,
}: {
  amount: number;
  originPrice: number;
  surcharge: number;
}) => (originPrice + surcharge) * amount;

export const getRandomNumber = ({ end, start = 0 }: { end: number; start?: number }) => {
  return Math.floor(Math.random() * (end - start + 1) + start);
};
