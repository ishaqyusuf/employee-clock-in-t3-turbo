import { relations } from "drizzle-orm";
import { boolean, decimal, pgTable, text, varchar } from "drizzle-orm/pg-core";

import { __uuidPri, _uuidRel, timeStamps } from "./schema-helper";
import {
  academicTerm,
  classSubject,
  school,
  sessionClass,
} from "./school-schema";
import { studentTermSheet } from "./student-schema";
import { user } from "./user-schema";

export const Assessment = pgTable("assessments", {
  id: __uuidPri,
  schoolId: _uuidRel("school_id", school.id),
  classSubjectId: _uuidRel("class_subject_id", classSubject.id),
  description: varchar("description"),
  obtainable: decimal("obtainable"),
  teacherId: _uuidRel("teacher_id", user.id),
  termId: _uuidRel("term_id", academicTerm.id),
  ...timeStamps,
});
export const AssessmentRelations = relations(Assessment, (r) => ({
  results: r.many(AssessmentResult),
}));
export const AssessmentResult = pgTable("assessment_result", {
  id: __uuidPri,
  assessmentId: _uuidRel("assessment_id", Assessment.id),
  score: decimal("score"),
  percentage: decimal("percentage"),
  studentTermSheetId: _uuidRel("student_term_sheet_id", studentTermSheet.id),
  ...timeStamps,
});

export const StudentDayAttendance = pgTable("student_day_attendance", {
  id: __uuidPri,
  sessionClassId: _uuidRel("session_class_id", sessionClass.id),
  teacherId: _uuidRel("teacher_id", user.id),
  classSubjectId: _uuidRel("class_subject_id", classSubject.id), //option
  termId: _uuidRel("term_id", academicTerm.id),
  ...timeStamps,
});
export const StudentDayAttendanceRelations = relations(
  StudentDayAttendance,
  (r) => ({
    attendance: r.many(StudentAttendance),
  }),
);
export const StudentAttendance = pgTable("student_attendance", {
  id: __uuidPri,
  attendanceId: _uuidRel("attendance_id", StudentDayAttendance.id),
  present: boolean("present").default(false),
  comment: text("comment"),
  teacherId: _uuidRel("teacher_id", user.id),
  studentTermSheetId: _uuidRel("student_term_sheet_id", studentTermSheet.id),
  ...timeStamps,
});
