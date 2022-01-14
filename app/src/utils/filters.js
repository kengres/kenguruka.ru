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
