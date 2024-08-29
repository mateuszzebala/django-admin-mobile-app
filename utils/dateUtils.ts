import moment from "moment";

export const convertStringToDate = (dateString: string): Date => {
  if (/^\d{2}:\d{2}:\d{2}$/.test(dateString)) {
    const [hours, minutes, seconds] = dateString.split(":").map(Number);
    const now = new Date();
    now.setHours(hours);
    now.setMinutes(minutes);
    now.setSeconds(seconds);
    now.setMilliseconds(0);
    return now;
  }
  return new Date(Date.parse(dateString));
};

export const getDateIsoString = (date: Date): string => {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  return `${y}-${m > 9 ? m : `0${m}`}-${d > 9 ? d : "0" + `0${d}`}`;
};

export const getTimeIsoString = (date: Date): string => {
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  return `${h > 9 ? h : `0${h}`}:${m > 9 ? m : `0${m}`}:${s > 9 ? s : `0${s}`}`;
};

export const humanDateString = {
  datetime: (date: Date) => moment(date).format("DD-MM-YYYY hh:mm:ss"),
  time: (date: Date) => moment(date).format("hh:mm:ss"),
  date: (date: Date) => moment(date).format("DD.MM.YYYY"),
};
