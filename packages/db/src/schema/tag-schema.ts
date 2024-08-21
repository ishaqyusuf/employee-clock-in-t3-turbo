import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { Blog } from "./blog-schema";
import { __serialPri, _serialRel, timeStamps } from "./schema-helper";
import { User } from "./user-schema";

export const Tag = pgTable("tags", {
  id: __serialPri,
  title: text("title").notNull(),
  ...timeStamps,
});

export const BlogTag = pgTable("blog_tag", {
  id: __serialPri,
  tagId: _serialRel("tag_id", Tag.id),
  blogId: _serialRel("blog_id", Blog.id),
  ...timeStamps,
});
export const SearchLog = pgTable("search_log", {
  id: __serialPri,
  userId: _serialRel("user_id", User.id), // Optional for logged-in users
  searchTerm: text("search_term").notNull(),
  searchedAt: timestamp("searched_at").notNull().defaultNow(),
  ...timeStamps,
});
