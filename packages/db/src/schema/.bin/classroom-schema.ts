import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

import { __uuidPri, _uuidRel, timeStamps } from "../schema-helper";
import { AcademicSession, School } from "../school-schema";
import { User } from "./user-schema";

export const ClassRoom = pgTable("classroom", {
  id: __uuidPri,
  name: varchar("name", { length: 256 }).notNull(),
  schoolId: _uuidRel("schoolId", School.id),
  classLevel: integer("classLevel").notNull().default(1),
  ...timeStamps,
});
export const Subjects = pgTable("subjects", {
  id: __uuidPri,
  name: varchar("name", { length: 256 }).notNull(),
  schoolId: _uuidRel("schoolId", School.id),
  ...timeStamps,
});
export const SessionClassRoom = pgTable("session_class", {
  id: __uuidPri,
  schoolId: _uuidRel("schoolId", School.id),
  academicSessionId: _uuidRel("academicSessionId", AcademicSession.id),
  academicClassId: _uuidRel("academicClassId", ClassRoom.id),
  classTeacherId: _uuidRel("class_teacher_id", User.id, false),
  ...timeStamps,
});
export const ClassSubject = pgTable("class_subject", {
  id: __uuidPri,
  name: varchar("name", { length: 256 }).notNull(),
  schoolId: _uuidRel("schoolId", School.id),
  academicSessionId: _uuidRel("academicSessionId", AcademicSession.id),
  academicClassId: _uuidRel("academicClassId", ClassRoom.id),
  sessionClassId: _uuidRel("sessionClassId", SessionClassRoom.id),
  teacherId: _uuidRel("teacher_id", User.id, false),
  ...timeStamps,
});
