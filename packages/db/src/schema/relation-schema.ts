import { relations } from "drizzle-orm";

import {
  albumIndexes,
  albums,
  blogNotes,
  blogs,
  comments,
} from "./blog-schema";
import { blogTags, tags } from "./tag-schema";
import {
  mediaAuthors,
  notifications,
  telegramChannels,
  users,
} from "./user-schema";

// Adjust imports based on your project structure

export const blogRelations = relations(blogs, ({ one, many }) => ({
  author: one(users, {
    fields: [blogs.authorId],
    references: [users.id],
  }),
  mediaAuthor: one(mediaAuthors, {
    fields: [blogs.mediaAuthorId],
    references: [mediaAuthors.id],
  }),
  telegramChannel: one(telegramChannels, {
    fields: [blogs.telegramChannelId],
    references: [telegramChannels.id],
  }),
  notes: many(blogNotes),
  tags: many(blogTags),
}));

export const userRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
  notes: many(blogNotes),
}));

export const albumRelations = relations(albums, ({ one, many }) => ({
  mediaAuthor: one(mediaAuthors, {
    fields: [albums.mediaAuthorId],
    references: [mediaAuthors.id],
  }),
  albumIndexes: many(albumIndexes),
}));

export const tagRelations = relations(tags, ({ many }) => ({
  blogTags: many(blogTags),
}));
export const commentRelations = relations(comments, ({ one }) => ({
  blog: one(blogs, {
    fields: [comments.blogId],
    references: [blogs.id],
  }),
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
}));

export const notificationRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));

// export const versionControlRelations = relations(blogVersions, ({ one }) => ({
//   blog: one(blogs, {
//     fields: [blogVersions.blogId],
//     references: [blogs.id],
//   }),
//   editor: one(users, {
//     fields: [blogVersions.editedBy],
//     references: [users.id],
//   }),
// }));
