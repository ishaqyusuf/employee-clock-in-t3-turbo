import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { BreakPeriod, WorkSession } from "../schema";

export const CreateClockInSchema = createInsertSchema(WorkSession, {
  employeeProfileId: z.string().min(1),
  startTime: z.string().min(1),
}).omit({
  id: true,
  createdAt: true,
  deletedAt: true,
  payrollRequestId: true,
  updatedAt: true,
});
export type CreateClockInSchemaType = z.infer<typeof CreateClockInSchema>;

export const TakeBreakSchema = createInsertSchema(BreakPeriod, {
  startTime: z.string().min(1),
  workSessionId: z.string().min(1),
}).omit({
  id: true,
  createdAt: true,
  deletedAt: true,
  durationInMinute: true,
  endTime: true,
  updatedAt: true,
});
export const BackToWorkSchema = createInsertSchema(BreakPeriod, {
  endTime: z.string().min(1),
  id: z.string().min(1).uuid(),
}).omit({
  startTime: true,
  workSessionId: true,
  createdAt: true,
  deletedAt: true,
  durationInMinute: true,
  updatedAt: true,
});
export const ClockoutSchema = createInsertSchema(WorkSession, {
  endTime: z.string().min(1),
  id: z.string().min(1),
})
  .extend({
    breakId: z.string(),
  })
  .omit({
    startTime: true,
    employeeProfileId: true,
    payrollRequestId: true,
    createdAt: true,
    deletedAt: true,
    durationInMinute: true,
    updatedAt: true,
  });
