export const isInvalidDate = (targetDate: Date) =>
  targetDate.toString() === 'Invalid Date';

const formatToZeroFilledString = (
  unfilledValue: string | number,
  limit: number,
) => {
  return unfilledValue.toString().padStart(limit, '0');
};

export const getParsedDateStringWithHypen = (date: Date) => {
  return `${date.getFullYear()}-${formatToZeroFilledString(
    date.getMonth() + 1,
    2,
  )}-${formatToZeroFilledString(date.getDate(), 2)}`;
};
