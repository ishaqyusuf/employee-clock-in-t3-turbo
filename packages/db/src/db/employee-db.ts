import {
  integer,
  pgTable,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

import { Company } from "./company-db";
import { __uuidPri, _uuidRel, timeStamps } from "./db-helper";
import { User } from "./user-db";

// Updated table and column names for better clarity and consistency

export const CurrencyExchange = pgTable("currency_exchanges", {
  id: __uuidPri,
  exchangeRate: integer("exchange_rate"), // clearer description
  amountInCents: integer("amount_in_cents"), // standardized cents notation
  totalExchanged: integer("total_exchanged"),
  ...timeStamps,
});

export const PayrollRequest = pgTable("payroll_requests", {
  id: __uuidPri,
  totalMinutesWorked: integer("total_minutes_worked"), // more descriptive
  totalPayableInCents: integer("total_payable_in_cents"),
  paidAt: timestamp("paid_at"),
  ...timeStamps,
});
export const EmployeeCompanyProfile = pgTable(
  "employee_company_profile",
  {
    id: __uuidPri,
    title: varchar("title"),
    companyId: _uuidRel("company_id", Company.id).notNull(),
    employeeId: _uuidRel("employee_id", User.id).notNull(),
    ...timeStamps,
  },
  (t) => ({
    unq: unique().on(t.employeeId, t.companyId),
  }),
);

export const WorkSession = pgTable("work_sessions", {
  id: __uuidPri,
  startTime: timestamp("start_time").notNull().defaultNow(),
  endTime: timestamp("end_time"),
  durationInMinute: integer("duration_in_minute"), // renamed to "duration" for clarity
  // breakDurationInMinute: integer("duration_in_minute"),
  payrollRequestId: _uuidRel("payroll_request_id", PayrollRequest.id),
  employeeProfileId: _uuidRel(
    "employee_profile_id",
    EmployeeCompanyProfile.id,
  ).notNull(),
  ...timeStamps,
});

export const WorkSessionNote = pgTable("work_session_notes", {
  id: __uuidPri,
  noteText: varchar("note_text"), // more descriptive column name
  workSessionId: _uuidRel("work_session_id", WorkSession.id).notNull(),
  ...timeStamps,
});

export const BreakPeriod = pgTable("break_periods", {
  id: __uuidPri,
  workSessionId: _uuidRel("work_session_id", WorkSession.id).notNull(),
  durationInMinute: integer("duration_in_minute"),
  startTime: timestamp("start_time").notNull().defaultNow(),
  endTime: timestamp("end_time"),
  ...timeStamps,
});
