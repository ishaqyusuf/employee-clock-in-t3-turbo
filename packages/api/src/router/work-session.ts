import { publicProcedure } from "../trpc";

export const workSessionRouter = {
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.WorkSession.findMany({});
  }),
};
