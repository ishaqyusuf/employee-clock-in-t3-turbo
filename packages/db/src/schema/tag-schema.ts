import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { blogs } from "./blog-schema";
import { __uuidPri, _uuidRel } from "./schema-helper";
import { users } from "./user-schema";

export const tags = pgTable("tags", {
  id: __uuidPri,
  title: text("title").notNull(),
});

export const blogTags = pgTable("blog_tags", {
  id: __uuidPri,
  tagId: _uuidRel("tag_id", tags.id),
  blogId: _uuidRel("blog_id", blogs.id),
});
export const searchLogs = pgTable("search_logs", {
  id: __uuidPri,
  userId: _uuidRel("user_id", users.id), // Optional for logged-in users
  searchTerm: text("search_term").notNull(),
  searchedAt: timestamp("searched_at").notNull().defaultNow(),
});
