import { Bot, webhookCallback } from "grammy";

import { env } from "~/env";

export const dynamic = "force-dynamic";

export const fetchCache = "force-no-store";

const token = env.TELEGRAM_TOKEN;

if (!token)
  throw new Error("TELEGRAM_BOT_TOKEN environment variable not found.");

const bot = new Bot(token);
bot.on("message:text", async (ctx) => {
  console.log(`MSG: ${ctx.message.text}`);
  await ctx.reply(ctx.message.text);
});

// bot.on("msg:audio", async (ctx) => {});

export const POST = webhookCallback(bot, "std/http");
