import { decimal, pgTable, varchar } from "drizzle-orm/pg-core";

import { EmployeeTransaction } from "./accounting-schema";
import { __uuidPri, _uuidRel, timeStamps } from "./schema-helper";
import { academicTerm, school, sessionClass } from "./school-schema";
import { user } from "./user-schema";

// import { user } from "./user-schema";

// export const EmployeeTermSheet = pgTable("employee_term_sheet", {
//   id: __uuidPri,
//   schoolId: _uuidRel("school_id", school.id),
//   workerId: _uuidRel("worker_id", user.id),
//   ...timeStamps,
// });

// export const EmployeeTermSheetRelation = relations(EmployeeTermSheet, (r) => ({
//   user: r.one(user, {
//     fields: [EmployeeTermSheet.workerId],
//     references: [user.id],
//   }),
//   services: r.many(EmployeeService),
// }));
export const BillableService = pgTable("billable_service", {
  id: __uuidPri,
  schoolId: _uuidRel("school_id", school.id),
  title: varchar("title"),
  amount: decimal("amount").notNull(),
  ...timeStamps,
});
export const EmployeeService = pgTable("employee_service", {
  id: __uuidPri,
  schoolId: _uuidRel("school_id", school.id),
  note: varchar("note"),
  amount: decimal("amount").default("0"),
  // employeeId: _uuidRel("employee_id", user.id),
  serviceId: _uuidRel("service_id", BillableService.id),
  termId: _uuidRel("term_id", academicTerm.id),
  employeeTxId: _uuidRel("employee_tx_id", EmployeeTransaction.id),
  ...timeStamps,
});
export const EmployeeClassRole = pgTable("employee_class_role", {
  id: __uuidPri,
  employeeId: _uuidRel("employee_id", user.id),
  sessionClassId: _uuidRel("session_class_id", sessionClass.id),
  role: varchar("role"),
  ...timeStamps,
});

export const EmployeeSubjectRole = pgTable("employee_subject_role", {
  id: __uuidPri,
  employeeClassRoleId: _uuidRel("employee_class_role_id", EmployeeClassRole.id),
  role: varchar("role"),
  ...timeStamps,
});
