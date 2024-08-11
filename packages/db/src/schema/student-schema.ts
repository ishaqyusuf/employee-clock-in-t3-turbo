import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { __uuidPri, _uuidRel, timeStamps } from "./schema-helper";
import { School, SessionClass } from "./school-schema";

export const Guardian = pgTable("guardian", {
  id: __uuidPri,
  schoolId: _uuidRel("schoolId", School.id),
  name: varchar("name", { length: 256 }).notNull(),
  ...timeStamps,
});
export const Student = pgTable("student", {
  id: __uuidPri,
  schoolId: _uuidRel("schoolId", School.id),
  firstName: varchar("first_name", { length: 256 }).notNull(),
  middleName: varchar("middle_name", { length: 256 }),
  lastName: varchar("last_name", { length: 256 }).notNull(),
  guardianId: _uuidRel("guardianId", Guardian.id, false),
  ...timeStamps,
});
export const CreateStudentSchema = createInsertSchema(Student).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const StudentSessionForm = pgTable("student_session_form", {
  id: __uuidPri,
  schoolId: _uuidRel("schoolId", School.id),
  studentId: _uuidRel("studentId", Student.id),
  sessionClassId: _uuidRel("sessionClassId", SessionClass.id),
  ...timeStamps,
});
