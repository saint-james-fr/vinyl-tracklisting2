import { writable, get } from "svelte/store";
import type { Writable } from "svelte/store";
import {
  defaultVinyl,
  defaultForm,
  defaultPlayer,
  defaultPlaylist,
} from "lib/default";

export const vinylStore: Writable<VinylType> = writable(defaultVinyl);
export const formStore: Writable<FormType> = writable(defaultForm);
export const playerStore: Writable<PlayerStore> = writable(defaultPlayer);
export const playlistStore = writable<PlaylistStore>(defaultPlaylist);
