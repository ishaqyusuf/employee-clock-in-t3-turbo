import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";

import { BreakPeriod, WorkSession } from "@acme/db/schema";

export const utilsModuleName = "utils-module";

dayjs.extend(isToday);
export { dayjs };
export function secondsString(secods) {
  const m = minuteString(secods / 60);
  return `${m.split(" ")[0]}:${String(secods % 60).padStart(2, "0")}`;
}
export function minuteString(m) {
  if (!m) m = 0;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(
    Math.floor(m % 60),
  ).padStart(2, "0")}`;
}
export function getOrdinal(day) {
  if (day > 3 && day < 21) return "th"; // 11th, 12th, 13th...
  switch (day % 10) {
    case 1:
      return "st"; // 1st, 21st...
    case 2:
      return "nd"; // 2nd, 22nd...
    case 3:
      return "rd"; // 3rd, 23rd...
    default:
      return "th"; // 4th, 5th, etc.
  }
}
export type WorkSessionWithBreaks = typeof WorkSession.$inferSelect & {
  breakPeriods: (typeof BreakPeriod.$inferSelect)[];
};
export function totalWorkDuration(data: WorkSessionWithBreaks) {
  const start = dayjs(data.startTime);
  const end = dayjs(data.endTime ?? undefined);
  const totalSeconds = end.diff(start, "seconds");
  let breakSeconds = 0;
  data.breakPeriods?.map((b) => {
    breakSeconds += dayjs(b.endTime ?? undefined).diff(b.startTime, "seconds");
  });
  const workSeconds = totalSeconds - breakSeconds;
  const workMinutes = Math.floor(workSeconds / 60);
  return {
    workMinutes,
    workSeconds,
    breakSeconds,
    totalSeconds,
  };
}
