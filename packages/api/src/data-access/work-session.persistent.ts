import type { z } from "zod";

import type {
  BackToWorkSchema,
  ClockoutSchema,
  CreateClockInSchemaType,
  TakeBreakSchema,
} from "@acme/db/schema";
import { and, desc, eq, isNull } from "@acme/db";
import { BreakPeriod, WorkSession } from "@acme/db/schema";
import { totalWorkDuration } from "@acme/utils-module";

import type { DbType } from "../trpc";
import {
  calculatePayPeriod,
  calculateWorkSession,
  timeList,
} from "../utils/work-session";

export async function __clockInDataAccess(
  db: DbType,
  { employeeProfileId, startTime, durationInMinute }: CreateClockInSchemaType,
) {
  try {
    const [c] = await db
      .insert(WorkSession)
      .values({
        employeeProfileId,
        startTime: new Date(startTime as any),
        //   endTime,
        durationInMinute,
      })
      .returning();
    return c;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    // else console.log()
  }
  return null;
}
export async function __clockoutDataAccess(
  db: DbType,
  data: z.infer<typeof ClockoutSchema>,
) {
  const endTime = new Date(data.endTime as any);
  const session = await db.query.WorkSession.findFirst({
    where: eq(WorkSession.id, data.id as any),
    with: {
      breakPeriods: true,
    },
  });
  if (!session) throw Error("not found");
  const workDuration = totalWorkDuration({
    ...session,
    endTime,
    breakPeriods: session.breakPeriods.map((pre) => {
      if (!pre.endTime) pre.endTime = endTime;
      return pre;
    }),
  });
  await db
    .update(WorkSession)
    .set({
      endTime,
      durationInMinute: workDuration.workMinutes,
      updatedAt: new Date(),
    })
    .where(eq(WorkSession.id, data.id as any));
  if (data.breakId)
    await db
      .update(BreakPeriod)
      .set({
        endTime,
        updatedAt: new Date(),
      })
      .where(eq(BreakPeriod.id, data.breakId as any));
}
export async function __takeBreakDataAccess(
  db: DbType,
  data: z.infer<typeof TakeBreakSchema>,
) {
  await db.insert(BreakPeriod).values({
    workSessionId: data.workSessionId,
    startTime: new Date(data.startTime as any),
  });
  return {
    status: "success",
  };
}
export async function __backToWorkDataAccess(
  db: DbType,
  data: z.infer<typeof BackToWorkSchema>,
) {
  await db
    .update(BreakPeriod)
    .set({
      endTime: new Date(data.endTime as any),
      updatedAt: new Date(),
    })
    .where(and(eq(BreakPeriod.id, data.id as any)));
}
export async function __workStatus(db: DbType) {
  const c = await db.query.WorkSession.findMany({
    with: {
      breakPeriods: true,
    },
    orderBy: desc(WorkSession.createdAt),
    // where: and(
    //   isNull(WorkSession.payrollRequestId),
    //   //   isNull(WorkSession.endTime),
    // ),
    // where: and(isNull(WorkSession.endTime), isNotNull(WorkSession.startTime)),
  });
  // await Promise.all(
  //   c.map(async (a) => {
  //     if (a.endTime) {
  //       const workDuration = totalWorkDuration(a);
  //       await db
  //         .update(WorkSession)
  //         .set({
  //           durationInMinute: workDuration.workMinutes,
  //           updatedAt: new Date(),
  //         })
  //         .returning();
  //     }
  //   }),
  // );
  const workSession = c.find((c) => !c.endTime);

  //   console.log()
  return {
    current: calculateWorkSession(workSession),
    payPeriod: calculatePayPeriod(c),
    list: timeList(c),
  };
}
