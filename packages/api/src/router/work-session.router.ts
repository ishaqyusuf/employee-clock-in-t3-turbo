import { and, isNotNull, isNull } from "@acme/db";
import {
  BackToWorkSchema,
  ClockoutSchema,
  CreateClockInSchema,
  TakeBreakSchema,
  User,
  WorkSession,
} from "@acme/db/schema";

import { __getExampleSession } from "../data-access/example";
import {
  __backToWorkDataAccess,
  __clockInDataAccess,
  __clockoutDataAccess,
  __takeBreakDataAccess,
  __workStatus,
} from "../data-access/work-session.persistent";
import { publicProcedure } from "../trpc";

export const workSessionRouter = {
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.WorkSession.findMany({});
  }),
  workStatus: publicProcedure.query(async ({ ctx }) => {
    return await __workStatus(ctx.db);
  }),
  clockIn: publicProcedure
    .input(CreateClockInSchema)
    .mutation(async ({ ctx, input }) => {
      return await __clockInDataAccess(ctx.db, input);
    }),
  clockOut: publicProcedure
    .input(ClockoutSchema)
    .mutation(async ({ ctx, input }) => {
      return await __clockoutDataAccess(ctx.db, input);
    }),
  takeBreak: publicProcedure
    .input(TakeBreakSchema)
    .mutation(async ({ ctx, input }) => {
      return await __takeBreakDataAccess(ctx.db, input);
    }),
  backToWork: publicProcedure
    .input(BackToWorkSchema)
    .mutation(async ({ ctx, input }) => {
      return await __backToWorkDataAccess(ctx.db, input);
    }),
};
// npx expo install react-native-web
