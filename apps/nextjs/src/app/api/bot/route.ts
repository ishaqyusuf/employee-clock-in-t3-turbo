import { Bot, webhookCallback } from "grammy";

import { db } from "@acme/db/client";
import { Blogs } from "@acme/db/schema";

import { env } from "~/env";

export const dynamic = "force-dynamic";

export const fetchCache = "force-no-store";

const token = env.TELEGRAM_TOKEN;

if (!token)
  throw new Error("TELEGRAM_BOT_TOKEN environment variable not found.");

const bot = new Bot(token);
console.log("HELLO MESSAGED!!!!");
bot.on("message", async (ctx) => {
  console.log(`MSG: ${ctx.message.text}`);
  await ctx.reply(ctx.message.text ?? "HELLO");
  await db.insert(Blogs).values({
    mediaType: "audio",
    status: "as",
    telegramId: "adsss",
    title: "lorem",
  });
});
// bot.on('message')
// bot.on("msg:audio", async (ctx) => {});

export const POST = webhookCallback(bot, "std/http");
