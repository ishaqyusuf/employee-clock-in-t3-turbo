import { relations } from "drizzle-orm";
import { pgTable, unique, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { __uuidPri, _uuidRel, timeStamps } from "./schema-helper";
import {
  academicClass,
  academicTerm,
  school,
  sessionClass,
} from "./school-schema";

export const Guardian = pgTable("guardian", {
  id: __uuidPri,
  schoolId: _uuidRel("school_id", school.id),
  name: varchar("name", { length: 256 }).notNull(),
  ...timeStamps,
});
export const Student = pgTable(
  "student",
  {
    id: __uuidPri,
    schoolId: _uuidRel("school_id", school.id),
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
export const CreateStudentSchema = createInsertSchema(Student).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const StudentSessionSheet = pgTable(
  "student_session_form",
  {
    id: __uuidPri,
    schoolId: _uuidRel("school_id", school.id),
    studentId: _uuidRel("student_id", Student.id),
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
    studentId: _uuidRel("student_id", Student.id),
    termId: _uuidRel("academic_term_id", academicTerm.id),
    sessionClassId: _uuidRel("session_class_id", sessionClass.id),
    ...timeStamps,
  },
  (t) => ({
    unq: unique().on(t.sessionSheetId, t.studentId, t.termId, t.sessionClassId),
  }),
);
export const StudentTermSheetRelation = relations(
  StudentTermSheet,
  ({ one, many }) => ({
    term: one(academicTerm, {
      fields: [StudentTermSheet.termId],
      references: [academicTerm.id],
    }),
    student: one(Student, {
      fields: [StudentTermSheet.studentId],
      references: [Student.id],
    }),
    sessionClass: one(sessionClass, {
      fields: [StudentTermSheet.sessionClassId],
      references: [sessionClass.id],
    }),
  }),
);
