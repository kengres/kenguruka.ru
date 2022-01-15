const addLeadingZero = val => val < 10 ? `0${val}` : val;

export const moneyFilter = val => {
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
}

export const dateTimeFilter = val => {
  if (!val) return "";
  const d = new Date(val);
  return `${addLeadingZero(d.getDate())}-${addLeadingZero(
    d.getMonth() + 1
  )}-${d.getFullYear()}`;
}
