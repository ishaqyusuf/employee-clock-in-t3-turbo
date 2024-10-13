import dayjs from "dayjs";

import type { BreakPeriod, WorkSession } from "@acme/db/schema";
import type { WorkSessionWithBreaks } from "@acme/utils-module";
import {
  getOrdinal,
  minuteString,
  secondsString,
  totalWorkDuration,
} from "@acme/utils-module";

export function calculateWorkSession(session?: WorkSessionWithBreaks) {
  if (!session) return { id: null };
  const { totalSeconds, breakSeconds, workSeconds, workMinutes } =
    totalWorkDuration(session);
  return {
    id: session.id,
    currentBreakId: session.breakPeriods?.find((b) => !b.endTime)?.id,
    startTime: session.startTime,
    totalSeconds,
    breakSeconds,
    workSeconds,
    workMinutes,
    totalWorkMinutesString: minuteString(workMinutes),
    totalWorkSecondsString: secondsString(totalSeconds),
  };
}

type Data = typeof WorkSession.$inferSelect & {
  breakPeriods: (typeof BreakPeriod.$inferSelect)[];
};
export function calculatePayPeriod(data?: Data[]) {
  const resp = data
    ?.filter((b) => !b.payrollRequestId)
    .map((data) => calculateWorkSession(data));
  const totalWorkMinutes = resp
    ?.map((s) => s.workMinutes ?? 0)
    .reduce((a, b) => a + b, 0);
  return {
    payableMinutes: totalWorkMinutes,
    payableMinuteString: minuteString(totalWorkMinutes),
  };
}
export function timeList(data?: Data[]) {
  return data
    ?.filter((s) => s.endTime)
    .map((item) => {
      const date = dayjs(item.createdAt);
      const ordinal = getOrdinal(date.date());
      return {
        id: item.id,
        date: date.format(`MMM D, YYYY`).replace(",", `${ordinal},`),
        inTime: dayjs(item.startTime).format("hh:mm A"),
        outTime: dayjs(item.endTime).format("hh:mm A"),
        totalHrs: minuteString(item.durationInMinute),
      };
    });
}
