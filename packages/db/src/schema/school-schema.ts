import {
  integer,
  jsonb,
  pgTable,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { __uuidPri, _uuidRel, timeStamps } from "./schema-helper";

export const school = pgTable(
  "school",
  {
    id: __uuidPri,
    name: varchar("name", { length: 256 }).notNull(),
    // slug: varchar("slug", { length: 256 }).notNull().unique(),
    subDomain: varchar("sub_domain", { length: 256 }).notNull().unique(),
    meta: jsonb("meta").$type<{
      id?: string;
    }>(),
    ...timeStamps,
  },
  (t) => ({
    unq: unique().on(t.name, t.subDomain),
  }),
);
export const createSchoolSchema = createInsertSchema(school, {});
export const academicSession = pgTable(
  "academic_session",
  {
    id: __uuidPri,
    name: varchar("name", { length: 256 }).notNull(),
    startDate: timestamp("start_date"),
    endDate: timestamp("end_date"),
    schoolId: _uuidRel("school_id", school.id),
    ...timeStamps,
  },
  (t) => ({
    unq: unique().on(t.name, t.schoolId),
  }),
);
export const academicTerm = pgTable(
  "academic_term",
  {
    id: __uuidPri,
    name: varchar("name", { length: 256 }).notNull(),
    schoolId: _uuidRel("school_id", school.id),
    academicSessionId: _uuidRel("academicSessionId", academicSession.id),
    startDate: timestamp("start_date"),
    endDate: timestamp("end_date"),
    ...timeStamps,
  },
  (t) => ({
    unq: unique().on(t.name, t.schoolId, t.academicSessionId),
  }),
);
// export const academicTermRelations = relations(
//   academicTerm,
//   ({ one, many }) => ({
//     sheets: many(studentTermSheet),
//   }),
// );
export const academicClass = pgTable(
  "academic_class",
  {
    id: __uuidPri,
    name: varchar("name", { length: 256 }).notNull(),
    schoolId: _uuidRel("school_id", school.id),
    classLevel: integer("classLevel").notNull().default(1),
    ...timeStamps,
  },
  (t) => ({
    unq: unique().on(t.name, t.schoolId),
  }),
);
export const subjects = pgTable(
  "subjects",
  {
    id: __uuidPri,
    name: varchar("name", { length: 256 }).notNull(),
    schoolId: _uuidRel("school_id", school.id),
    ...timeStamps,
  },
  (t) => ({
    unq: unique().on(t.name, t.schoolId),
  }),
);
export const sessionClass = pgTable(
  "session_class",
  {
    id: __uuidPri,
    schoolId: _uuidRel("school_id", school.id),
    academicSessionId: _uuidRel("academicSessionId", academicSession.id),
    academicClassId: _uuidRel("academicClassId", academicClass.id),
    ...timeStamps,
  },
  (t) => ({
    unq: unique().on(t.academicClassId, t.schoolId, t.academicSessionId),
  }),
);
export const classSubject = pgTable(
  "class_subject",
  {
    id: __uuidPri,
    schoolId: _uuidRel("school_id", school.id),
    academicSessionId: _uuidRel("academicSessionId", academicSession.id),
    academicClassId: _uuidRel("academicClassId", academicClass.id),
    sessionClassId: _uuidRel("session_class_id", sessionClass.id),
    subjectId: _uuidRel("subject_id", subjects.id),
    ...timeStamps,
  },
  (t) => ({
    unq: unique().on(t.sessionClassId, t.subjectId),
  }),
);
