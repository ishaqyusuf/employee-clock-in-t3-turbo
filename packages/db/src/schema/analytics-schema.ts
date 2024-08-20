import { pgTable, timestamp } from "drizzle-orm/pg-core";

import { Blogs } from "./blog-schema";
import { __uuidPri, _uuidRel, timeStamps } from "./schema-helper";
import { User } from "./user-schema";

export const BlogViews = pgTable("blog_views", {
  id: __uuidPri,
  blogId: _uuidRel("blog_id", Blogs.id),
  userId: _uuidRel("user_id", User.id), // Optional for logged-in users
  viewedAt: timestamp("viewed_at").notNull().defaultNow(),
  ...timeStamps,
});

export const BlogLikes = pgTable("blog_likes", {
  id: __uuidPri,
  blogId: _uuidRel("blog_id", Blogs.id),
  userId: _uuidRel("user_id", User.id),
  likedAt: timestamp("liked_at").notNull().defaultNow(),
  ...timeStamps,
});
