import type Anime from '$lib/types/Anime';
import type { Writable } from 'svelte/store';
import getAnimes from './getAnimes';
import { getStore } from './hmr-stores';
import { convert } from 'html-to-text';
import type Episode from '$lib/types/Episode';

export default async function getAnime(url: string, animes: Anime[]) {
	const res = await (await fetch('https://www.neko-sama.fr/anime/info/' + url)).text();
	const id = parseInt(/(\d+)(-)/gm.exec(url)?.[1] as string) as number;

	const anime = animes.find((anime: Anime) => anime.id === id);

	const episodes = JSON.parse(/(var episodes = )(.*)(;)/g.exec(res)?.[2] as string).map((ep: Episode) => {
		return { ...ep, episode: parseInt(/(\d.*)/g.exec(ep.episode)?.[0] as string) };
	});

	const synopsis = convert(/(<div class="synopsis">\n<p>\n)([^]*)(<\/p>\n<\/div>)/gm.exec(res)?.[2] as string);
	const cover = /(id="head" style="background-image: url\()(.*)(\);)/gm.exec(res)?.[2] as string;

	return {
		...anime,
		episodes,
		synopsis,
		cover,
	} as Anime;
}
