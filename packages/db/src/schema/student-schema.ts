import { relations } from "drizzle-orm";
import { pgTable, unique, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { __uuidPri, _uuidRel, timeStamps } from "./schema-helper";
import { academicTerm, school, sessionClass } from "./school-schema";

export const guardian = pgTable("guardian", {
  id: __uuidPri,
  schoolId: _uuidRel("school_id", school.id),
  name: varchar("name", { length: 256 }).notNull(),
  ...timeStamps,
});
export const student = pgTable(
  "student",
  {
    id: __uuidPri,
    schoolId: _uuidRel("school_id", school.id),
    firstName: varchar("first_name", { length: 256 }).notNull(),
    otherName: varchar("other_name", { length: 256 }),
    surname: varchar("surname", { length: 256 }).notNull(),
    guardianId: _uuidRel("guardianId", guardian.id, false),
    ...timeStamps,
  },
  (t) => ({
    unq: unique().on(t.schoolId, t.firstName, t.otherName, t.surname),
  }),
);
export const createStudentSchema = createInsertSchema(student).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const StudentSessionSheet = pgTable(
  "student_session_form",
  {
    id: __uuidPri,
    schoolId: _uuidRel("school_id", school.id),
    studentId: _uuidRel("student_id", student.id),
    sessionClassId: _uuidRel("session_class_id", sessionClass.id),
    ...timeStamps,
  },
  (t) => ({
    unq: unique().on(t.schoolId, t.studentId, t.sessionClassId),
  }),
);
export const studentTermSheet = pgTable(
  "student_term_sheet",
  {
    id: __uuidPri,
    sessionSheetId: _uuidRel("session_sheet_id", StudentSessionSheet.id),
    studentId: _uuidRel("student_id", student.id),
    termId: _uuidRel("academic_term_id", academicTerm.id),
    ...timeStamps,
  },
  (t) => ({
    unq: unique().on(t.sessionSheetId, t.studentId, t.termId),
  }),
);
export const StudentTermSheetRelation = relations(
  studentTermSheet,
  ({ one, many }) => ({
    term: one(academicTerm, {
      fields: [studentTermSheet.termId],
      references: [academicTerm.id],
    }),
  }),
);
