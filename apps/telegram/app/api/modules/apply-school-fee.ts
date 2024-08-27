import { composeForm, formField, initComposer } from "../utils";

const _ctx = initComposer("school_fee");

_ctx.settings.on.callbackQuery = async (ctx) => {
  //
};

_ctx.form = composeForm({
  fields: [
    formField("name", "Name"),
    formField("email", "Name"),
    formField("password", "Name"),
  ] as const,
})
  .addList("name", async (s, data) => {
    return {
      list: [],
    };
  })
  .addInput("email", async (value, formData, inputType) => {
    if (inputType == "custom") throw Error("Custom input not allowed");
  });
// form.settings.list.name =

export default _ctx.composer;
