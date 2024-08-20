import { pgTable, varchar } from "drizzle-orm/pg-core";

import { __uuidPri, _uuidRel } from "../schema-helper";
import { School } from "./school-schema";

export const User = pgTable("user", {
  id: __uuidPri,
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }),
  schoolId: _uuidRel("schoolId", School.id),
  username: varchar("username", { length: 256 }),
  role: varchar("role"),
  password: varchar("password", { length: 256 }),
});
