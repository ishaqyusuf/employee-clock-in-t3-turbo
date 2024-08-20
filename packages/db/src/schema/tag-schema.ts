import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { Blogs } from "./blog-schema";
import { __uuidPri, _uuidRel, timeStamps } from "./schema-helper";
import { User } from "./user-schema";

export const Tag = pgTable("tags", {
  id: __uuidPri,
  title: text("title").notNull(),
  ...timeStamps,
});

export const BlogTag = pgTable("blog_tag", {
  id: __uuidPri,
  tagId: _uuidRel("tag_id", Tag.id),
  blogId: _uuidRel("blog_id", Blogs.id),
  ...timeStamps,
});
export const SearchLog = pgTable("search_log", {
  id: __uuidPri,
  userId: _uuidRel("user_id", User.id), // Optional for logged-in users
  searchTerm: text("search_term").notNull(),
  searchedAt: timestamp("searched_at").notNull().defaultNow(),
  ...timeStamps,
});
