import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { __uuidPri, _uuidRel } from "./schema-helper";

export const users = pgTable("users", {
  id: __uuidPri,
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  role: varchar("role", { length: 20 }).notNull(), // e.g., "admin", "editor", "viewer"
  status: varchar("status", { length: 20 }).notNull(),
});

export const mediaAuthors = pgTable("media_author", {
  id: __uuidPri,
  name: text("name").notNull(),
  meta: text("meta"),
});

export const telegramChannels = pgTable("telegram_channel", {
  id: __uuidPri,
  name: text("name").notNull(),
  meta: text("meta"),
});
export const notifications = pgTable("notifications", {
  id: __uuidPri,
  userId: _uuidRel("user_id", users.id),
  message: text("message").notNull(),
  type: varchar("type", { length: 20 }).notNull(), // e.g., "blog_update", "note_published"
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
