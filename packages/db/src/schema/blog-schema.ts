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
import { mediaAuthors, telegramChannels, users } from "./user-schema";

export const blogs = pgTable("blog", {
  id: __uuidPri,
  telegramId: varchar("telegram_id", { length: 50 }).notNull(),
  mediaType: varchar("media_type", { length: 20 }).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  status: varchar("status", { length: 20 }).notNull(),
  published: boolean("published").notNull().default(false),
  meta: text("meta"),
  authorId: _uuidRel("author_id", users.id),
  publishedAt: timestamp("published_at"),
  mediaAuthorId: _uuidRel("media_author_id", mediaAuthors.id),
  telegramChannelId: _uuidRel("telegram_channel_id", telegramChannels.id),
});

export const blogNotes = pgTable("blog_note", {
  id: __uuidPri,
  userId: _uuidRel("user_id", users.id),
  note: text("note").notNull(),
  blogId: _uuidRel("blog_id", blogs.id),
  status: varchar("status", { length: 20 }).notNull(),
  published: boolean("published").notNull().default(false),
});

export const albums = pgTable("album", {
  id: __uuidPri,
  name: text("name").notNull(),
  mediaAuthorId: _uuidRel("media_author_id", mediaAuthors.id),
});

export const albumIndexes = pgTable("album_index", {
  id: __uuidPri,
  albumId: _uuidRel("album_id", albums.id),
  blogId: _uuidRel("blog_id", blogs.id),
  mediaIndex: integer("media_index").notNull(),
});
export const comments = pgTable("comments", {
  id: __uuidPri,
  blogId: _uuidRel("blog_id", blogs.id),
  userId: _uuidRel("user_id", users.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  status: varchar("status", { length: 20 }).notNull(), // e.g., "approved", "pending", "rejected"
});
