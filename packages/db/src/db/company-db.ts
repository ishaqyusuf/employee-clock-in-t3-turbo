import { pgTable, unique, varchar } from "drizzle-orm/pg-core";

import { __uuidPri, timeStamps } from "./db-helper";

export const Company = pgTable(
  "company",
  {
    id: __uuidPri,
    slug: varchar("slug"),
    name: varchar("name").notNull(),
    ...timeStamps,
  },
  (t) => ({
    unq: unique().on(t.name),
  }),
);
