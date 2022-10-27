import type Anime from '$lib/types/Anime';
import { writable } from 'svelte-local-storage-store';
import type { Writable } from 'svelte/store';

export const seen: Writable<{ ep: string; animeId: number; time: number; url: string; animeName: string; url_image: string; duration: number }[]> = writable('seen', []);
