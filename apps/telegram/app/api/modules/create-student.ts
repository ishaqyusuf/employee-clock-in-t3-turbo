import { Composer, InlineKeyboard } from "grammy";

import { CmdContext } from "../bot";
import { CommandNames } from "../utils";

const composer = new Composer();
const commandName: CommandNames = "new_student";
composer.command(commandName, async (ctx: CmdContext) => {
  const keys = new InlineKeyboard();
  await ctx.deleteMessage();
});
export default composer;
