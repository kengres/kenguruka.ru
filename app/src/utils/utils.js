import { addLeadingZero } from "./filters"

const isValidDate = date => {
  return new Date(date).getTime() === new Date(date).getTime()
}

export const formtDateToLocal = (date) => {
  if (!isValidDate(date)) return ""
  const d = new Date(date)
  return `${d.getFullYear()}-${addLeadingZero(
    d.getMonth() + 1
  )}-${addLeadingZero(d.getDate())}T${addLeadingZero(
    d.getHours()
  )}:${addLeadingZero(d.getMinutes())}`;
}

export const getMonthCount = (to, from) => {
  let d1 = new Date(from);
  let d2 = new Date(to);
  // console.log('isNaN(d1.getTime()): ', isNaN(d1.getTime()))
  // console.log('isNaN(d2.getTime()): ', isNaN(d2.getTime()))
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    // console.log(`======= returning`);
    return 0;
  }

  if (d1.getTime() > d2.getTime()) {
    d1 = new Date(to);
    d2 = new Date(from);
  }
  return (d2.getFullYear() - d1.getFullYear()) * 12 - d1.getMonth() + d2.getMonth() + 1;
};

export const getMonthFirstDay = date => {
  const d = new Date(date);
  const d1 = new Date(new Date(d.setDate(1)).setHours(0, -d.getTimezoneOffset(), 0, 0))
  return d1.toISOString().slice(0, 10);
}