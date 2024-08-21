import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { __serialPri, _serialRel, timeStamps } from "./schema-helper";
import { MediaAuthor, TelegramChannel, User } from "./user-schema";

export const Album = pgTable("album", {
  id: __serialPri,
  name: text("name").notNull(),
  mediaAuthorId: _serialRel("media_author_id", MediaAuthor.id),
  ...timeStamps,
});
export const BlogAudio = pgTable("blog_audio", {
  id: __serialPri,
  fileId: varchar("file_id", { length: 200 }),
  mimeType: varchar("file_id", { length: 200 }),
  performer: text("performer"),
  title: text("title"),
  fileName: text("file_name"),
  duration: integer("duration"),
  fileUniqueId: varchar("file_unique_id", { length: 50 }),
  authorId: _serialRel("author_id", MediaAuthor.id, false),
  fileSize: integer("file_size"),
  albumId: _serialRel("album_id", Album.id, false),
  ...timeStamps,
});

export const AlbumIndex = pgTable("album_index", {
  id: __serialPri,
  albumId: _serialRel("album_id", Album.id),
  audioId: _serialRel("audio_id", BlogAudio.id),
  mediaIndex: integer("media_index").notNull(),
  ...timeStamps,
});
export const Blog = pgTable("blog", {
  id: __serialPri,
  telegramId: varchar("telegram_id", { length: 50 }).notNull(),
  // mediaType: varchar("media_type", { length: 20 }).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  status: varchar("status", { length: 20 }).notNull(),
  published: boolean("published").notNull().default(false),
  meta: text("meta"),
  authorId: _serialRel("author_id", User.id, false),
  audioId: _serialRel("audio_id", BlogAudio.id, false),
  publishedAt: timestamp("published_at"),
  telegramDate: integer("date"),
  telegramChannelId: _serialRel(
    "telegram_channel_id",
    TelegramChannel.id,
    false,
  ),
  ...timeStamps,
});
export const BlogImage = pgTable("blog_image", {
  id: __serialPri,
  fileId: varchar("file_id", { length: 200 }),
  duration: integer("width"),
  height: integer("height"),
  blogId: _serialRel("blog_id", Blog.id),
  fileUniqueId: varchar("file_unique_id", { length: 50 }),
  fileSize: integer("file_size"),
  ...timeStamps,
});

export const BlogNote = pgTable("blog_note", {
  id: __serialPri,
  userId: _serialRel("user_id", User.id),
  note: text("note").notNull(),
  blogId: _serialRel("blog_id", Blog.id),
  status: varchar("status", { length: 20 }).notNull(),
  published: boolean("published").notNull().default(false),
  ...timeStamps,
});

export const Comment = pgTable("comments", {
  id: __serialPri,
  blogId: _serialRel("blog_id", Blog.id),
  userId: _serialRel("user_id", User.id),
  content: text("content").notNull(),
  status: varchar("status", { length: 20 }).notNull(), // e.g., "approved", "pending", "rejected"
  ...timeStamps,
});
