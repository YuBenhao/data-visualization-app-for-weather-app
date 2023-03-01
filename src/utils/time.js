import dayjs from "dayjs";
// format dayjs time type
export const format = (time, format = 'YY-MM-DD HH:mm:ss') => {
  return dayjs(time).format(format);;
};
