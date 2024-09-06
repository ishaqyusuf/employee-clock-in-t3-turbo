import { relations } from "drizzle-orm";
import { boolean, decimal, pgTable, varchar } from "drizzle-orm/pg-core";

import { EmployeeService } from "./employee-schema";
import { __uuidPri, _uuidRel, timeStamps } from "./schema-helper";
import { academicTerm, school } from "./school-schema";
import { StudentSessionSheet } from "./student-schema";

export const schoolWallet = pgTable("school_wallet", {
  id: __uuidPri,
  schoolId: _uuidRel("school_id", school.id),
  balance: decimal("balance").default("0.00"),
  ...timeStamps,
});

type PaymentTypes = "credit" | "debit";
type TransactionType =
  | "school fee"
  | "salary"
  | "book"
  | "uniform"
  | "entry form"
  | "misc";
export const transaction = pgTable("transaction", {
  id: __uuidPri,
  schoolId: _uuidRel("school_id", school.id),
  paymentType: varchar("payment_type").$type<PaymentTypes>(),
  transactionType: varchar("transaction_type").$type<TransactionType>(),
  headline: varchar("headline"),
  description: varchar("description"),
  amount: decimal("amount").notNull(),
  coupon: boolean("coupon").default(false),
  termId: _uuidRel("academicTermId", academicTerm.id),
  ...timeStamps,
});
export const studentTransaction = pgTable("student_transaction", {
  id: __uuidPri,
  schoolId: _uuidRel("school_id", school.id),
  studentSessionFormId: _uuidRel(
    "studentSessionFormId",
    StudentSessionSheet.id,
  ),
  transactionId: _uuidRel("transactionId", transaction.id),
  ...timeStamps,
});
export const EmployeeTransaction = pgTable("employee_transaction", {
  id: __uuidPri,
  schoolId: _uuidRel("school_id", school.id),
  transactionId: _uuidRel("transactionId", transaction.id),
  ...timeStamps,
});
export const EmployeeTransactionRelation = relations(
  EmployeeTransaction,
  (r) => ({
    employeeServices: r.many(EmployeeService),
  }),
);
export const bookTransaction = pgTable("book_transaction", {
  id: __uuidPri,
  schoolId: _uuidRel("school_id", school.id),
  studentSessionFormId: _uuidRel(
    "studentSessionFormId",
    StudentSessionSheet.id,
  ),
  transactionId: _uuidRel("transactionId", transaction.id),
  ...timeStamps,
});
export const book = pgTable("book", {
  id: __uuidPri,
  schoolId: _uuidRel("school_id", school.id),
  title: varchar("title"),
  amount: decimal("amount").notNull(),
  ...timeStamps,
});
export const purchasedBook = pgTable("transaction_book", {
  id: __uuidPri,
  schoolId: _uuidRel("school_id", school.id),
  title: varchar("title"),
  bookId: _uuidRel("bookId", book.id),
  bookTransactionId: _uuidRel("bookTransactionId", bookTransaction.id),
  ...timeStamps,
});
