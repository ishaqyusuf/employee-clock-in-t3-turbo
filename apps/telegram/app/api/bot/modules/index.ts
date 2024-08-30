import { Composer } from "grammy";

import addAudioToAlbum from "./forms/add-audio-to-album";
import createAuthor from "./forms/create-author";

const composer = new Composer();

composer.use(createAuthor).use(addAudioToAlbum);

export default composer;
