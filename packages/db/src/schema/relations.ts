import { relations } from "drizzle-orm";

import {
  EmployeeClassRole,
  EmployeeService,
  EmployeeSubjectRole,
} from "./employee-schema";
import { account, session, user } from "./user-schema";

export const UserRelations = relations(user, ({ many }) => ({
  accounts: many(account),
  employeeServices: many(EmployeeService),
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
