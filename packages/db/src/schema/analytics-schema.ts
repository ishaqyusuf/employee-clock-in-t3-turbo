import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";

import { blogs } from "./blog-schema";
import { __uuidPri, _uuidRel } from "./schema-helper";
import { users } from "./user-schema";

export const blogViews = pgTable("blog_views", {
  id: __uuidPri,
  blogId: _uuidRel("blog_id", blogs.id),
  userId: _uuidRel("user_id", users.id), // Optional for logged-in users
  viewedAt: timestamp("viewed_at").notNull().defaultNow(),
});

export const blogLikes = pgTable("blog_likes", {
  id: __uuidPri,
  blogId: _uuidRel("blog_id", blogs.id),
  userId: _uuidRel("user_id", users.id),
  likedAt: timestamp("liked_at").notNull().defaultNow(),
});
