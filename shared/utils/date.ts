const isValidDate = (targetDate: Date) =>
  targetDate.toString() === "Invalid Date";

const formatStringTo = (_originString: string | number, limit: number) => {
  let originString = _originString;
  if (typeof originString === "number") originString = _originString.toString();

  return originString.padStart(limit, "0");
};

export const getParsedDateStringWithHypen = (date: Date) => {
  return `${date.getFullYear()}-${formatStringTo(
    date.getMonth() + 1,
    2
  )}-${formatStringTo(date.getDate(), 2)}`;
};
