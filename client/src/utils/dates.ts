const monthNamesKeys = [
  "utils.date.january",
  "utils.date.february",
  "utils.date.march",
  "utils.date.april",
  "utils.date.may",
  "utils.date.june",
  "utils.date.july",
  "utils.date.august",
  "utils.date.september",
  "utils.date.october",
  "utils.date.november",
  "utils.date.december",
];

const getFullMonth = (d: Date) => {
  return monthNamesKeys[d.getMonth()];
};

export { getFullMonth };
