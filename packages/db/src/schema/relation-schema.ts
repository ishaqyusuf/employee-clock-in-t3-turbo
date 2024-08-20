import { relations } from "drizzle-orm";

import { Album, AlbumIndex, BlogNote, Blogs, Comment } from "./blog-schema";
import { BlogTag, Tag } from "./tag-schema";
import {
  Account,
  MediaAuthor,
  Notification,
  Session,
  TelegramChannel,
  User,
} from "./user-schema";

// Adjust imports based on your project structure

export const BlogRelations = relations(Blogs, ({ one, many }) => ({
  author: one(User, {
    fields: [Blogs.authorId],
    references: [User.id],
  }),
  mediaAuthor: one(MediaAuthor, {
    fields: [Blogs.mediaAuthorId],
    references: [MediaAuthor.id],
  }),
  telegramChannel: one(TelegramChannel, {
    fields: [Blogs.telegramChannelId],
    references: [TelegramChannel.id],
  }),
  notes: many(BlogNote),
  Tag: many(BlogTag),
}));

export const UserRelation = relations(User, ({ many }) => ({
  Blogs: many(Blogs),
  notes: many(BlogNote),
}));

export const AlbumRelation = relations(Album, ({ one, many }) => ({
  mediaAuthor: one(MediaAuthor, {
    fields: [Album.mediaAuthorId],
    references: [MediaAuthor.id],
  }),
  AlbumIndex: many(AlbumIndex),
}));

export const TagRelation = relations(Tag, ({ many }) => ({
  BlogTag: many(BlogTag),
}));
export const CommentRelation = relations(Comment, ({ one }) => ({
  blog: one(Blogs, {
    fields: [Comment.blogId],
    references: [Blogs.id],
  }),
  user: one(User, {
    fields: [Comment.userId],
    references: [User.id],
  }),
}));

export const NotificationRelation = relations(Notification, ({ one }) => ({
  user: one(User, {
    fields: [Notification.userId],
    references: [User.id],
  }),
}));
export const SessionRelations = relations(Session, ({ one }) => ({
  user: one(User, { fields: [Session.userId], references: [User.id] }),
}));
export const AccountRelations = relations(Account, ({ one }) => ({
  user: one(User, { fields: [Account.userId], references: [User.id] }),
}));
// export const versionControlRelations = relations(blogVersions, ({ one }) => ({
//   blog: one(Blogs, {
//     fields: [blogVersions.blogId],
//     references: [Blogs.id],
//   }),
//   editor: one(users, {
//     fields: [blogVersions.editedBy],
//     references: [User.id],
//   }),
// }));
