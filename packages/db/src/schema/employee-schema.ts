import {
  decimal,
  integer,
  pgTable,
  time,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { __uuidPri, _uuidRel, timeStamps } from "./schema-helper";
import { User } from "./user-schema";

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

export const WorkSession = pgTable("work_sessions", {
  id: __uuidPri,
  startTime: timestamp("start_time").notNull().defaultNow(),
  endTime: timestamp("end_time"),
  totalWorkDuration: time("total_work_duration"), // renamed to "duration" for clarity
  payrollRequestId: _uuidRel("payroll_request_id", PayrollRequest.id).notNull(),
  employeeId: _uuidRel("employee_id", User.id).notNull(),
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
  startTime: timestamp("start_time").notNull().defaultNow(),
  endTime: timestamp("end_time"),
  ...timeStamps,
});
