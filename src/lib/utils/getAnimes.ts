import type Anime from '$lib/types/Anime';
import type { Writable } from 'svelte/store';
import { getStore } from './hmr-stores';

export default async function getAnimes() {
	const res = await fetch('https://www.neko-sama.fr/animes-search-vostfr.json?4f0132ead4638d44be1bde76eedfdcec');
	const data = await res.json();

	return data;
}
