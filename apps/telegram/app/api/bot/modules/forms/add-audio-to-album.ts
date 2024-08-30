import { Composer } from "grammy";

import { db } from "@acme/db/client";

import {
  CommandNames,
  composeForm,
  formField,
  initComposer,
} from "../../utils";

const cmdName: CommandNames = "add_media_to_album";

const form = composeForm({
  fields: [
    formField("album", "Album"),
    formField("albumId", "Album Id"),
    formField("author", "Author"),
    formField("authorId", "Author Id"),
    formField("blogIds", "Blog Ids"),
  ],
})
  ._onInputs({
    // album:
    async album(value, formData, inputType) {
      let skip = 1;
      if (inputType == "btn") {
        formData.albumId = value;
        skip = 3;
      } else formData.album = value;
      return {
        skip,
      };
    },
    async author(value, formData, inputType) {
      let skip = 1;
      if (inputType == "btn") {
        formData.authorId = value;
      } else formData.author = value;
      return {
        skip,
      };
    },
  })
  ._addLists({
    async album(s, data) {
      const albums = await db.query.Album.findMany({
        with: {
          mediaAuthor: true,
        },
      });
      return {
        list: albums.map((l) => ({
          label: `${l.name} | ${l.mediaAuthor?.name}`,
          value: `${l.id}`,
        })),
      };
    },
  })
  ._onSubmit(async (formData, ctx) => {});

const _ctx = initComposer(cmdName, form);
const composer = new Composer();
composer.command(cmdName, _ctx.command);
composer.callbackQuery(_ctx.cbqPattern, _ctx.callbackQuery);
export default composer;

//   ._addList("album", async (s, data) => {
//     const albums = await db.query.Album.findMany({
//       with: {
//         mediaAuthor: true,
//       },
//     });
//     return {
//       list: albums.map((l) => ({
//         label: `${l.name} | ${l.mediaAuthor?.name}`,
//         value: `${l.id}`,
//       })),
//     };
//   })
//   ._onInput("album", async (value, formData, inputType) => {
//     let skip = 1;
//     if (inputType == "btn") {
//       formData.albumId = value;
//       skip = 2;
//     } else formData.album = value;
//     return {
//       skip,
//     };
//   });
