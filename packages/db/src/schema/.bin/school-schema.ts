// school, academicSession, academicTerm
// classes,

import { jsonb, pgTable, unique, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { __uuidPri, _uuidRel, timeStamps } from "./schema-helper";

export const School = pgTable("school", {
  id: __uuidPri,
  name: varchar("name", { length: 256 }).unique().notNull(),
  subDomain: varchar("sub_domain").unique(),
  customDomain: varchar("custom_domain").unique(),

  meta: jsonb("meta").$type<{
    _?: string;
  }>(),
  ...timeStamps,
});
export const CreateSchoolSchema = createInsertSchema(School, {});
export const AcademicSession = pgTable(
  "academic_session",
  {
    id: __uuidPri,
    name: varchar("name", { length: 256 }).notNull(),
    schoolId: _uuidRel("schoolId", School.id),
    ...timeStamps,
  },
  (t) => ({
    unq: unique().on(t.schoolId, t.name),
  }),
);
export const AcademicTerm = pgTable("academic_term", {
  id: __uuidPri,
  name: varchar("name", { length: 256 }).notNull(),
  schoolId: _uuidRel("schoolId", School.id),
  academicSessionId: _uuidRel("academicSessionId", AcademicSession.id),
  ...timeStamps,
});
