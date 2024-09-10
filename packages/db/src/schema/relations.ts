import { relations } from "drizzle-orm";

import {
  EmployeeClassRole,
  EmployeeService,
  EmployeeSubjectRole,
} from "./employee-schema";
import { academicSession, academicTerm, school } from "./school-schema";
import { studentTermSheet } from "./student-schema";
import { account, session, user } from "./user-schema";

export const UserRelations = relations(user, ({ many, one }) => ({
  accounts: many(account),
  employeeServices: many(EmployeeService),
  school: one(school, {
    fields: [user.id],
    references: [school.id],
  }),
}));

export const AccountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));
export const SessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const EmployeeClassRoleRelations = relations(
  EmployeeClassRole,
  ({ many }) => ({
    subjectRoles: many(EmployeeSubjectRole),
  }),
);

export const AcademicTermRelations = relations(
  academicTerm,
  ({ one, many }) => ({
    sheets: many(studentTermSheet),
    academicSession: one(academicSession, {
      fields: [academicTerm.id],
      references: [academicSession.id],
    }),
  }),
);
