import { relations } from "drizzle-orm";

import { Company } from "./company-db";
import {
  BreakPeriod,
  CurrencyExchange,
  EmployeeCompanyProfile,
  PayrollRequest,
  WorkSession,
  WorkSessionNote,
} from "./employee-db";
import { User } from "./user-db";

// Relations for CurrencyExchange
export const currencyExchangeRelations = relations(
  CurrencyExchange,
  ({ one }) => ({
    payrollRequest: one(PayrollRequest, {
      fields: [CurrencyExchange.id],
      references: [PayrollRequest.id],
    }),
  }),
);

// Relations for PayrollRequest
export const payrollRequestRelations = relations(
  PayrollRequest,
  ({ many, one }) => ({
    workSessions: many(WorkSession),
    currencyExchange: one(CurrencyExchange, {
      fields: [PayrollRequest.id],
      references: [CurrencyExchange.id],
    }),
  }),
);

// Relations for WorkSession
export const workSessionRelations = relations(WorkSession, ({ many, one }) => ({
  employeeProfile: one(EmployeeCompanyProfile, {
    fields: [WorkSession.employeeProfileId],
    references: [EmployeeCompanyProfile.id],
  }),
  payrollRequest: one(PayrollRequest, {
    fields: [WorkSession.payrollRequestId],
    references: [PayrollRequest.id],
  }),
  notes: many(WorkSessionNote),
  breakPeriods: many(BreakPeriod),
}));

// Relations for WorkSessionNote
export const workSessionNoteRelations = relations(
  WorkSessionNote,
  ({ one }) => ({
    workSession: one(WorkSession, {
      fields: [WorkSessionNote.workSessionId],
      references: [WorkSession.id],
    }),
  }),
);

// Relations for BreakPeriod
export const breakPeriodRelations = relations(BreakPeriod, ({ one }) => ({
  workSession: one(WorkSession, {
    fields: [BreakPeriod.workSessionId],
    references: [WorkSession.id],
  }),
}));

export const employeeCompanyProfileRelations = relations(
  EmployeeCompanyProfile,
  ({ one, many }) => ({
    employee: one(User, {
      fields: [EmployeeCompanyProfile.employeeId],
      references: [User.id],
    }),
    company: one(Company, {
      fields: [EmployeeCompanyProfile.companyId],
      references: [Company.id],
    }),
  }),
);
export const companyRelations = relations(
  EmployeeCompanyProfile,
  ({ one, many }) => ({
    employeeProfiles: many(EmployeeCompanyProfile),
  }),
);
