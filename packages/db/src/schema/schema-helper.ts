import { sql } from "drizzle-orm";
import { timestamp, uuid } from "drizzle-orm/pg-core";

export const timeStamps = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  }).$onUpdateFn(() => sql`now()`),
};

export function _uuidRel(name: string, col: string | any, notNull = true) {
  let c = uuid(name);
  if (notNull) c = c.notNull();
  return c.references(() => col as any);
}
export const __uuidPri = uuid("id").notNull().primaryKey().defaultRandom();
