import { temperature } from '../constants/temperature';

export const getTemperature = (isIce: boolean) => (isIce ? temperature.ICED : temperature.HOT);
