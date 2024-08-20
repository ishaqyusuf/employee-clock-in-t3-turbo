import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { __uuidPri, _uuidRel, timeStamps } from "./schema-helper";
import { MediaAuthor, TelegramChannel, User } from "./user-schema";

export const Blogs = pgTable("blog", {
  id: __uuidPri,
  telegramId: varchar("telegram_id", { length: 50 }).notNull(),
  mediaType: varchar("media_type", { length: 20 }).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  status: varchar("status", { length: 20 }).notNull(),
  published: boolean("published").notNull().default(false),
  meta: text("meta"),
  authorId: _uuidRel("author_id", User.id),
  publishedAt: timestamp("published_at"),
  mediaAuthorId: _uuidRel("media_author_id", MediaAuthor.id),
  telegramChannelId: _uuidRel("telegram_channel_id", TelegramChannel.id),
  ...timeStamps,
});

export const BlogNote = pgTable("blog_note", {
  id: __uuidPri,
  userId: _uuidRel("user_id", User.id),
  note: text("note").notNull(),
  blogId: _uuidRel("blog_id", Blogs.id),
  status: varchar("status", { length: 20 }).notNull(),
  published: boolean("published").notNull().default(false),
  ...timeStamps,
});

export const Album = pgTable("album", {
  id: __uuidPri,
  name: text("name").notNull(),
  mediaAuthorId: _uuidRel("media_author_id", MediaAuthor.id),
  ...timeStamps,
});

export const AlbumIndex = pgTable("album_index", {
  id: __uuidPri,
  albumId: _uuidRel("album_id", Album.id),
  blogId: _uuidRel("blog_id", Blogs.id),
  mediaIndex: integer("media_index").notNull(),
  ...timeStamps,
});
export const Comment = pgTable("comments", {
  id: __uuidPri,
  blogId: _uuidRel("blog_id", Blogs.id),
  userId: _uuidRel("user_id", User.id),
  content: text("content").notNull(),
  status: varchar("status", { length: 20 }).notNull(), // e.g., "approved", "pending", "rejected"
  ...timeStamps,
});
