import { Composer, InlineKeyboard } from "grammy";

import type { CallbackQuery, CmdContext, ReplyContext } from "./bot";
import { globalCtx } from "./route";

const cmd = <T extends string>(command: T, description?: string) =>
  ({
    command,
    description,
  }) as const;
export const commandList = [
  cmd("new_student", "Enroll new student."),
  cmd("school_fee", "Accept School Fee."),
] as const;
export type CommandNames = (typeof commandList)[number]["command"];

// export type CommandNames = (typeof commandList)[number]["command"];

interface ComposerSettings {
  on?: {
    command?;
    callbackQuery?;
    submit?: (data, ctx) => Promise<void>;
  };
}
interface Field {
  field: string;
  title: string;
}
interface ComposeFormProps<T extends readonly Field[]> {
  fields?: T;
}

export function composeForm<T extends readonly Field[]>({
  fields,
}: ComposeFormProps<T>) {
  type FTypes = FieldTypes2<T>; // Extract field types
  type DataType = {
    [k in FTypes]: any;
  };
  type ListFn = (
    keyboard: InlineKeyboard,
    data: DataType,
    // cbKeyFn: (k: string) => string,
  ) => Promise<{ list: { label: string; value: string }[] }>;
  type OnInput = (
    value: string,
    formData: DataType,
    inputType: "btn" | "custom",
  ) => Promise<void>;
  interface FormSettings {
    // list?: { [k in FTypes]: Promise<any> };
    list?: Partial<Record<FTypes, ListFn>>;
    validate?: Partial<Record<FTypes, Promise<any>>>;
    onInput?: Partial<Record<FTypes, OnInput>>;
    // onCallback?: Partial<Record<FTypes, Promise<any>>>;
    // transformList?: Partial<Record<FTypes, Promise<any>>>;
    // renderList?: Partial<Record<FTypes, Promise<any>>>;
  }
  const settings: FormSettings = {
    onInput: {},
    list: {},
  };
  const _ctx = {
    ...settings,
    fields,
    hello(c: FTypes) {
      console.log(c); // Example usage of the parameter
    },
    onInput(c: FTypes, fn: OnInput) {
      settings.onInput[c] = fn;
      return _ctx;
    },
    addList(c: FTypes, fn: ListFn) {
      settings.list[c] = fn;
      return _ctx;
    },
  };
  return _ctx;
}
type ComposeForm = ReturnType<typeof composeForm>;
export const initComposer = (cmdName: CommandNames) => {
  const composer = new Composer();
  const cbqPattern = new RegExp(`^${cmdName}_(.+)$`);
  const settings: ComposerSettings = {
    on: {},
  };
  const form: ComposeForm = null;
  let fieldIndex = 0;
  async function renderField(reply: ReplyContext) {
    const field = form.fields[fieldIndex];
    const _fieldList = form.list[field.field];
    function cbKeyFn(k) {
      return `${cmdName}|${field.field}|${k}`;
    }
    if (_fieldList) {
      const keyb = new InlineKeyboard();
      const { list } = await _fieldList(keyb, formData);
      list.map((item, index) => {
        keyb.text(item.label, cbKeyFn(item.value));
        if (index % 0 == 1) keyb.row();
      });
      await reply(field.title, {
        reply_markup: keyb,
      });
    }
  }
  let formData = {};
  composer.command(cmdName, async (ctx: CmdContext) => {
    globalCtx.botInstance = cmdName;
    formData = {};
    if (form) {
      fieldIndex = 0;
      await renderField(ctx.reply);
    }
  });
  async function clearForm() {
    //
  }
  async function nextInput(reply, ctx) {
    fieldIndex++;
    if (form.fields.length == fieldIndex) {
      const submit = settings.on.submit;
      if (submit) await submit(formData, ctx);
      await clearForm();
      return;
    }
    await renderField(reply);
  }
  composer.on("message:text", async (ctx) => {
    //
  });
  composer.callbackQuery(cbqPattern, async (ctx) => {
    const data = ctx.callbackQuery.data;
    const [comnd, formk, val] = data.split("|");
    if (comnd != cmdName) return null;
    await settings.on.callbackQuery?.(ctx);
    const field = form.fields[fieldIndex];
    const onInput = form.onInput[field.field];
    try {
      await onInput(val, formData, "btn");
      await nextInput(ctx.reply, ctx);
    } catch (error) {
      if (error instanceof Error) await ctx.reply(error.message);
      await renderField(ctx.reply);
    }
  });

  return {
    settings,
    form,
    composer,
    cmdName,
    cbqPattern,
    callbackQuery(handler: (ctx: CallbackQuery) => Promise<void>) {
      return async (ctx: CallbackQuery) => {
        await handler(ctx);
      };
    },
    validate() {
      if (globalCtx.botInstance != cmdName) throw Error("...");
    },
  };
};
export const formField = <T extends string>(field: T, title?: string) => {
  return {
    field,
    title,
  } as const;
};
export type FieldTypes2<T extends readonly { field: string }[]> =
  T[number]["field"];

interface ListHelperProps<T> {
  list: T[];
  ctx;
  renderList: (data: T, keyboard: InlineKeyboard) => void;
}
export async function listHelper<T>({
  ctx,
  list,
  renderList,
}: ListHelperProps<T>) {
  const ls = new InlineKeyboard();
  if (list.length) {
    list.map((l) => renderList(l, ls));
    await ctx.reply("Result:", {
      reply_markup: ls,
    });
  } else {
    await ctx.reply(`Empty list`);
  }
}
