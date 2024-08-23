import { Bot } from "grammy";

import { env } from "~/env";

const token = env.TELEGRAM_TOKEN;

if (!token)
  throw new Error("TELEGRAM_BOT_TOKEN environment variable not found.");

export const bot = new Bot(token);
// export type Message = NonNullable<
//   Awaited<ReturnType<RawApi["getUpdates"]>>[number]["callback_query"]
// >["message"];
