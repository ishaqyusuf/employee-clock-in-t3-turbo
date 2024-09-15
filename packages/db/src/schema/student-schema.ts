import { pgTable, unique, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { __uuidPri, _uuidRel, timeStamps } from "./schema-helper";
import {
  AcademicSession,
  AcademicTerm,
  School,
  SessionClass,
} from "./school-schema";

export const Guardian = pgTable("guardian", {
  id: __uuidPri,
  schoolId: _uuidRel("school_id", School.id).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  ...timeStamps,
});
export const Student = pgTable(
  "student",
  {
    id: __uuidPri,
    schoolId: _uuidRel("school_id", School.id).notNull(),
    firstName: varchar("first_name", { length: 256 }).notNull(),
    otherName: varchar("other_name", { length: 256 }),
    surname: varchar("surname", { length: 256 }).notNull(),
    guardianId: _uuidRel("guardianId", Guardian.id, false),
    ...timeStamps,
  },
  (t) => ({
    unq: unique().on(t.schoolId, t.firstName, t.otherName, t.surname),
  }),
);

export const CreateStudentSchema = createInsertSchema(Student)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  })
  .extend({
    sessionClassId: z.string(),
  });
export const StudentSessionSheet = pgTable(
  "student_session_form",
  {
    id: __uuidPri,
    schoolId: _uuidRel("school_id", School.id).notNull(),
    studentId: _uuidRel("student_id", Student.id),
    sessionId: _uuidRel("session_id", AcademicSession.id),
    ...timeStamps,
  },
  (t) => ({
    unq: unique().on(t.schoolId, t.studentId),
  }),
);
export const StudentTermSheet = pgTable(
  "student_term_sheet",
  {
    id: __uuidPri,
    sessionSheetId: _uuidRel("session_sheet_id", StudentSessionSheet.id),
    termId: _uuidRel("academic_term_id", AcademicTerm.id),
    studentId: _uuidRel("student_id", Student.id),
    sessionClassId: _uuidRel("session_class_id", SessionClass.id),
    ...timeStamps,
  },
  (t) => ({
    unq: unique().on(t.sessionSheetId, t.studentId, t.termId, t.sessionClassId),
  }),
);
