import { pgTable, timestamp } from "drizzle-orm/pg-core";

import { Blog } from "./blog-schema";
import { __serialPri, _serialRel, timeStamps } from "./schema-helper";
import { User } from "./user-schema";

export const BlogViews = pgTable("blog_views", {
  id: __serialPri,
  blogId: _serialRel("blog_id", Blog.id),
  userId: _serialRel("user_id", User.id), // Optional for logged-in users
  viewedAt: timestamp("viewed_at").notNull().defaultNow(),
  ...timeStamps,
});

export const BlogLikes = pgTable("blog_likes", {
  id: __serialPri,
  blogId: _serialRel("blog_id", Blog.id),
  userId: _serialRel("user_id", User.id, false),
  likedAt: timestamp("liked_at").notNull().defaultNow(),
  ...timeStamps,
});
