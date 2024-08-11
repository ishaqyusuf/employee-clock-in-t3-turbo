import { AcademicSession, School } from "@acme/db/schema";

import { publicProcedure } from "../trpc";

export const bootstrapRouter = {
  init: publicProcedure.mutation(async ({ ctx, input }) => {
    //
    const s = await ctx.db
      .insert(School)
      .values({
        name: "Daarul Hadith",
        meta: {},
      })
      .returning();
    const school = s[0];
    const session = await ctx.db
      .insert(AcademicSession)
      .values({
        name: "1445/1446",
        schoolId: school?.id,
      })
      .returning();
  }),
};
