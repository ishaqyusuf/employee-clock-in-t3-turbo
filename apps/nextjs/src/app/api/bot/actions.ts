import type { Message } from "grammy/types";

import { eq } from "@acme/db";
import { db } from "@acme/db/client";
import {
  Album,
  Blog,
  BlogAudio,
  BlogImage,
  MediaAuthor,
  User,
} from "@acme/db/schema";

import {
  albumsPromptList,
  createAlbumPrompt,
  getAlbumsPrompt,
} from "./album.prompt";
import { telegramChannelId } from "./channel";

// import { User } from "@acme/db/schema";

export async function createAudioBlog(msg: Message) {
  if (!msg.audio) return "not an audio";
  const blog = await createBlog(msg);
  if (!blog) return "unable to create";
  // const author = await createAuthor(msg);
  const s = await db.insert(BlogAudio).values({});
}
// async function createAuthor(msg: Message) {
//   if (msg.audio) {
//     const authors = await db
//       .insert(MediaAuthor)
//       .values({
//         name: msg.audio.title,
//         meta: {},
//       })
//       .onConflictDoNothing({
//         target: [MediaAuthor.name],
//       })
//       .returning();
//     const author = authors[0];
//     return author.id;
//   }
//   return null;
// }
export async function createBlog(msg: Message) {
  const channelId = await telegramChannelId(msg);
  const blogs = await db
    .insert(Blog)
    .values({
      telegramChannelId: channelId,
      telegramMessageId: msg.message_id,
      title: msg.audio?.title,
      description: msg.caption ?? msg.text,
      telegramDate: msg.date,
      // blogType:
    })
    .returning();
  const blog = blogs[0];
  return blog;
}
export async function createPhotoBlog(msg: Message) {
  const blog = await createBlog(msg);
  if (!blog) return "unable to create";
  await db.insert(BlogImage).values(
    (msg.photo ?? []).map((p) => {
      return {
        height: p.height,
        width: p.width,
        fileId: p.file_id,
        blogId: blog.id,
        fileUniqueId: p.file_unique_id,
        fileSize: p.file_size,
      };
    }),
  );
  return `blogId: ${blog.id}`;
  // await Promise.all(msg.photo?.map(async () ))
}

export async function getAuthor() {
  let firstAuthor = await db.query.User.findFirst({});
  if (!firstAuthor)
    firstAuthor = (
      await db.insert(User).values({
        email: "ishaqyusuf024@gmail.com",
        name: "Ishaq Yusuf",
        password: `...`,
        role: "Admin",
        status: "active",
      })
    ).rows[0];
  return firstAuthor;
}
const promptList = [
  "?",
  ...albumsPromptList,
  "authors",
  "author-schema",
  "update-blog-schema",
  "update-blog",
] as const;
// interface UpdateBlog {
//   mediaIds: number[];
// }
export async function telegramPrompt(p: (typeof promptList)[number], msg) {
  switch (p) {
    case "create-album":
      return await createAlbumPrompt(msg);
    case "albums":
      return await getAlbumsPrompt();
    case "?":
    default:
      return promptList.join("\n");
      break;
  }
}
