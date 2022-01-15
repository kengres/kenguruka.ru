const addLeadingZero = (val) => (val < 10 ? `0${val}` : val);

const isDateToday = (val) => {
  return (
    !!val &&
    new Date(val).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
  );
};

export const moneyFilter = (val) => {
  if (!val) return "";
  return `${val}`
    .split("")
    .reverse()
    .map((i, index) => {
      if (index && index % 3 === 0) return `${i}.`;
      return i;
    })
    .reverse()
    .join("");
};

export const dateTimeFilter = (val) => {
  if (!val) return "";
  const d = new Date(val);
  if (isDateToday(d)) {
    return `${addLeadingZero(d.getHours())}:${addLeadingZero(d.getMinutes())}`;
  }
  return `${addLeadingZero(d.getDate())}.${addLeadingZero(
    d.getMonth() + 1
  )}.${d.getFullYear()}`;
};
