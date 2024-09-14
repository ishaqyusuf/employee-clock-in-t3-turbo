import { createInsertSchema } from "drizzle-zod";

import { BillableService } from "./staff-schema";
import { User } from "./user-schema";

export const CreateStaffSchema = createInsertSchema(User, {}).omit({});
export const CreateBillableServiceSchema = createInsertSchema(
  BillableService,
  {},
).omit({});
