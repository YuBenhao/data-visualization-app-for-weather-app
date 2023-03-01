import dayjs from "dayjs";

export const format = (time, format = 'YY-MM-DD HH:mm:ss') => {
  return dayjs(time).format(format);;
};
