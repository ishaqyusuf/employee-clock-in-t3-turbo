import { relations } from "drizzle-orm";

import {
  BreakPeriod,
  CurrencyExchange,
  PayrollRequest,
  WorkSession,
  WorkSessionNote,
} from "./employee-schema";
import { User } from "./user-schema";

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
  employee: one(User, {
    fields: [WorkSession.employeeId],
    references: [User.id],
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
