import { Message } from "grammy/types";
import { z } from "zod";

import { sql } from "@acme/db";
import { db } from "@acme/db/client";
import {
  Blog,
  BlogAudio,
  BlogImage,
  CreateBlogSchema,
  MediaAuthor,
  TelegramChannel,
  Thumbnail,
} from "@acme/db/schema";

import { MyContext } from "../bot";
import { first, replyParams } from "../helper";

type CreateBlogDTO = z.infer<typeof CreateBlogSchema>;
export async function createAudioBlog(ctx: MyContext) {
  const msg = ctx.message;
  const audioData = ctx.message.audio;
  if (!audioData) {
    await ctx.reply(`unable to create`, replyParams(ctx));
    return;
  }
  const author = await createAuthor(audioData.performer);
  const thumbnailId = await createThumbnail(msg);

  const audio = first(
    await db
      .insert(BlogAudio)
      .values({
        fileId: audioData.file_id,
        duration: audioData.duration,
        fileSize: audioData.file_size,
        fileName: audioData.file_name,
        mimeType: audioData.mime_type,
        thumbnailId,
        authorId: author?.id,
        fileUniqueId: audioData.file_unique_id,
        performer: audioData.performer,
        // performer: msg.audio.thumbnail.
      })
      .returning(),
  );
  if (!audio) {
    return await ctx.reply("unable to create audio", replyParams(ctx));
  }
  const audioId = audio.id;
  const blog = await createBlog(msg, {
    audioId,
    blogType: "audio",
    // publishedAt: new Date(),
  });
  if (!blog) return await ctx.reply("unable to create blog", replyParams(ctx));
  await ctx.reply(
    [
      `Blog Id: ${blog.id}`,
      `File Name: ${audio.fileName}`,
      `Author: ${author?.name}`,
      `Description: ${blog?.description}`,
    ].join("\n"),
    replyParams(ctx),
  );
}
export async function createThumbnail(msg: Message) {
  if (msg.audio?.thumbnail) {
    const { file_id, file_unique_id, height, width, file_size } =
      msg.audio.thumbnail;
    const s = first(
      await db
        .insert(Thumbnail)
        .values({
          fileId: file_id,
          fileSize: file_size,
          fileUniqueId: file_unique_id,
          height: height,
          width: width,
        })
        .onConflictDoNothing({
          target: [
            Thumbnail.fileId,
            Thumbnail.fileUniqueId,
            Thumbnail.height,
            Thumbnail.width,
          ],
        })
        .returning(),
    );
    return s?.id;
  }

  return null;
}
export async function createAuthor(name) {
  if (!name) return null;
  const author = first(
    await db
      .insert(MediaAuthor)
      .values({
        name,
      })
      .onConflictDoNothing({
        // target: MediaAuthor.name,
        where: sql`name <> '${name}'`,
      })
      .returning(),
  );
  return author;
}
export async function createBlog(
  msg: Message,
  extras: Partial<CreateBlogDTO> = {},
) {
  const channelId = await telegramChannelId(msg);
  const blogs = await db
    .insert(Blog)
    .values({
      telegramChannelId: channelId,
      telegramMessageId: msg.message_id,
      title: msg.audio?.title,
      description: msg.caption ?? msg.text,
      telegramDate: msg.date,
      //   publishedAt: new Date(),
      ...extras,
      // blogType:
    })
    .returning();
  const blog = blogs[0];
  return blog;
}
export async function createPhotoBlog(ctx: MyContext) {
  const msg = ctx.message;
  const blog = await createBlog(msg);
  if (!blog) {
    await ctx.reply("unable to create");
    return;
  }
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
  const resp = `blogId: ${blog.id}`;
  await ctx.reply(resp);
}
export async function telegramChannelId(msg: Message) {
  const channel = msg.forward_origin;
  if (channel?.type == "channel") {
    const chat = channel.chat;
    const c = (
      await db
        .insert(TelegramChannel)
        .values({
          title: chat.title,
          type: chat.type,
          channelId: chat.id,
          username: chat.username,
        })
        .onConflictDoNothing({
          target: [TelegramChannel.title, TelegramChannel.username],
        })
        .returning()
    )[0];
    return c?.id;
  }
  return null;
}
