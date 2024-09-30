import moment from "moment";

export function addMinutes(date: Date, minutes: number): Date {
  return moment(date).add(minutes, 'minutes').toDate();
}

export function removeMinutes(date: Date, minutes: number): Date {
  return moment(date).subtract(minutes, 'minutes').toDate();
}