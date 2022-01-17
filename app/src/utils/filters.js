const MONTH_LIST = [
  "Jan:January",
  "Feb:February",
  "Mar:March",
  "Apr:April",
  "May:May",
  "Jun:June",
  "Jul:July",
  "Aug:August",
  "Sep:September",
  "Oct:October",
  "Nov:November",
  "Dec:December",
]

export const addLeadingZero = (val) => (val < 10 ? `0${val}` : val);

const isDateToday = (val) => {
  return (
    !!val &&
    new Date(val).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
  );
};
const isDateThisYear = (val) => {
  return (
    !!val &&
    new Date(val).getFullYear() === new Date().getFullYear()
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
    return `Today ${addLeadingZero(d.getHours())}:${addLeadingZero(d.getMinutes())}`;
  }
  // return `${addLeadingZero(d.getDate())}.${addLeadingZero(
  //   d.getMonth() + 1
  // )}.${d.getFullYear()}`;

  let dateStr = `${(MONTH_LIST[d.getMonth()] || ":").split(":")[0]} ${addLeadingZero(d.getDate())}`;

  if (!isDateThisYear(d)) {
    dateStr += `, ${d.getFullYear()}`;
  }

  return dateStr;
};
