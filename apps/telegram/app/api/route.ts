import type { CommandNames } from "./utils";
import { bot } from "./bot";
import modules from "./modules";

interface Props {
  botInstance?: CommandNames;
}
export const globalCtx: Props = {};
bot.use(modules);
