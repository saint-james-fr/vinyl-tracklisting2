import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import {defaultVinyl, defaultForm } from "lib/default";

export const vinylStore: Writable<VinylType> = writable(defaultVinyl);
export const formStore: Writable<FormType> = writable(defaultForm);