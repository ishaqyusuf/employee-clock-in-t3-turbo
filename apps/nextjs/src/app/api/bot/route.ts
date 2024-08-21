import { Bot, webhookCallback } from "grammy";

import { db } from "@acme/db/client";
import { Blog } from "@acme/db/schema";

import { env } from "~/env";
import { getAuthor, telegramPrompt } from "./actions";

export const dynamic = "force-dynamic";

export const fetchCache = "force-no-store";

const token = env.TELEGRAM_TOKEN;

if (!token)
  throw new Error("TELEGRAM_BOT_TOKEN environment variable not found.");

const bot = new Bot(token);
console.log("HELLO MESSAGED!!!!");
bot.on("message", async (ctx) => {
  console.log(`MSG:`, ctx.message);

  const author = await getAuthor();
  console.log({ author });
  const { forward_origin, audio, photo, caption, date, message_id, text } =
    ctx.message;
  console.log(text);
  const prompt = text?.split("\n");
  if (prompt?.startsWith("/")) {
    const msg = await telegramPrompt(prompt.split("/")[1]);
    await ctx.reply(msg, {
      reply_parameters: {
        message_id: ctx.msgId,
        chat_id: ctx.chatId,
      },
    });
    return;
  }
  if (photo?.length) {
  }
  if (audio) {
  }
  await ctx.reply(JSON.stringify(ctx.message), {
    reply_parameters: {
      message_id: ctx.msgId,
      chat_id: ctx.chatId,
    },
  });
  // await db.insert(Blogs).values({
  //   mediaType: "audio",
  //   status: "as",
  //   telegramId: "adsss",
  //   title: "lorem",
  //   // au
  // });
});
// bot.on('message')
// bot.on("msg:audio", async (ctx) => {});

export const POST = webhookCallback(bot, "std/http");
