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