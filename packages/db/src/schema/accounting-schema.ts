import { decimal, pgTable, varchar } from "drizzle-orm/pg-core";

import { __uuidPri, _uuidRel, timeStamps } from "./schema-helper";
import { AcademicTerm, School } from "./school-schema";
import { StudentSessionForm } from "./student-schema";
import { User } from "./user-schema";

export const SchoolWallet = pgTable("school_wallet", {
  id: __uuidPri,
  schoolId: _uuidRel("schoolId", School.id),
  balance: decimal("balance").default("0.00"),
  ...timeStamps,
});

type PaymentTypes = "credit" | "debit";
export const Transaction = pgTable("transaction", {
  id: __uuidPri,
  schoolId: _uuidRel("schoolId", School.id),
  type: varchar("type").$type<PaymentTypes>(),
  headline: varchar("headline"),
  description: varchar("description"),
  amount: decimal("amount").notNull(),
  academicTermId: _uuidRel("academicTermId", AcademicTerm.id),
  ...timeStamps,
});
export const StudentTransaction = pgTable("student_transaction", {
  id: __uuidPri,
  schoolId: _uuidRel("schoolId", School.id),
  studentSessionFormId: _uuidRel("studentSessionFormId", StudentSessionForm.id),
  transactionId: _uuidRel("transactionId", Transaction.id),
  ...timeStamps,
});
export const BookTransaction = pgTable("book_transaction", {
  id: __uuidPri,
  schoolId: _uuidRel("schoolId", School.id),
  studentSessionFormId: _uuidRel("studentSessionFormId", StudentSessionForm.id),
  transactionId: _uuidRel("transactionId", Transaction.id),
  ...timeStamps,
});
export const Book = pgTable("book", {
  id: __uuidPri,
  schoolId: _uuidRel("schoolId", School.id),
  title: varchar("title"),
  amount: decimal("amount").notNull(),
  ...timeStamps,
});
export const PurchasedBook = pgTable("transaction_book", {
  id: __uuidPri,
  schoolId: _uuidRel("schoolId", School.id),
  title: varchar("title"),
  bookId: _uuidRel("bookId", Book.id),
  bookTransactionId: _uuidRel("bookTransactionId", BookTransaction.id),
  ...timeStamps,
});
export const ServiceCharge = pgTable("service_charge", {
  id: __uuidPri,
  schoolId: _uuidRel("schoolId", School.id),
  title: varchar("title"),
  amount: decimal("amount").notNull(),
  ...timeStamps,
});
export const UserServiceCharge = pgTable("user_service_charge", {
  id: __uuidPri,
  schoolId: _uuidRel("schoolId", School.id),
  userId: _uuidRel("userId", User.id),
  amount: decimal("amount").notNull(),
  transactionId: _uuidRel("transactionId", Transaction.id, false),
  ...timeStamps,
});
