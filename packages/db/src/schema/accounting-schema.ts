import { boolean, decimal, pgTable, varchar } from "drizzle-orm/pg-core";

import { __uuidPri, _uuidRel, timeStamps } from "./schema-helper";
import { AcademicTerm, School } from "./school-schema";
import { BillableService, StaffTermSheet } from "./staff-schema";
// import { StaffTermSheet } from "./staff-schema";
import { StudentTermSheet } from "./student-schema";
import { User } from "./user-schema";

export const SchoolWallet = pgTable("school_wallet", {
  id: __uuidPri,
  schoolId: _uuidRel("school_id", School.id).notNull(),
  balance: decimal("balance").default("0.00"),
  ...timeStamps,
});

type PaymentTypes = "deposit" | "withdraw";
export const transactionTypes = [
  "school fee",
  "salary",
  "inventory",
  "uniform",
  "entry form",
  "service payment",
  "misc",
] as const;
export type TransactionType = (typeof transactionTypes)[number];
export const Transaction = pgTable("transaction", {
  id: __uuidPri,
  schoolId: _uuidRel("school_id", School.id),
  paymentType: varchar("payment_type").$type<PaymentTypes>(),
  transactionType: varchar("transaction_type").$type<TransactionType>(),
  headline: varchar("headline"),
  description: varchar("description"),
  amount: decimal("amount").notNull(),
  coupon: boolean("coupon").default(false),
  termId: _uuidRel("academic_term_id", AcademicTerm.id),
  studentTermId: _uuidRel("student_term_id", StudentTermSheet.id, false),
  staffTermId: _uuidRel("staff_term_id", StaffTermSheet.id, false),
  ...timeStamps,
});
// export const StudentTransaction = pgTable("student_transaction", {
//   id: __uuidPri,
//   schoolId: _uuidRel("school_id", School.id).notNull(),
//   studentSessionFormId: _uuidRel(
//     "studentSessionFormId",
//     StudentSessionSheet.id,
//   ),
//   transactionId: _uuidRel("transactionId", Transaction.id),
//   ...timeStamps,
// });
// export const StaffTransaction = pgTable("staff_transaction", {
//   id: __uuidPri,
//   schoolId: _uuidRel("school_id", School.id).notNull(),
//   transactionId: _uuidRel("transactionId", Transaction.id),
//   ...timeStamps,
// });
// export const BookTransaction = pgTable("book_transaction", {
//   id: __uuidPri,
//   schoolId: _uuidRel("school_id", School.id).notNull(),
//   studentSessionFormId: _uuidRel(
//     "studentSessionFormId",
//     StudentSessionSheet.id,
//   ),
//   transactionId: _uuidRel("transactionId", Transaction.id),
//   ...timeStamps,
// });
export const Inventory = pgTable("inventory", {
  id: __uuidPri,
  schoolId: _uuidRel("school_id", School.id).notNull(),
  title: varchar("title"),
  type: varchar("type"),
  amount: decimal("amount").notNull(),
  ...timeStamps,
});
export const InventorySales = pgTable("inventory_sales", {
  id: __uuidPri,
  schoolId: _uuidRel("school_id", School.id).notNull(),
  title: varchar("title"),
  bookId: _uuidRel("book_id", Inventory.id),
  transactionId: _uuidRel("transaction_id", Transaction.id),
  ...timeStamps,
});
export const StaffService = pgTable("staff_service", {
  id: __uuidPri,
  schoolId: _uuidRel("school_id", School.id).notNull(),
  note: varchar("note"),
  amount: decimal("amount").default("0"),
  staffId: _uuidRel("staff_id", User.id).notNull(),
  serviceId: _uuidRel("service_id", BillableService.id),
  termId: _uuidRel("term_id", AcademicTerm.id),
  transactionId: _uuidRel("staff_tx_id", Transaction.id, false),
  ...timeStamps,
});
