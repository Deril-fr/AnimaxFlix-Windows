<script lang="ts">
	import type { PageData } from './$types';
	import getM3U8 from '$lib/utils/getM3U8';
	import Player from '$lib/components/Player.svelte';
	import type { Writable } from 'svelte/store';
	import type Anime from '$lib/types/Anime';
	import { getStore } from '$lib/utils/hmr-stores';
	import getAnimes from '$lib/utils/getAnimes';
	import getAnime from '$lib/utils/getAnime';
	import * as stores from '$lib/stores/stores';
	import BackBtn from '$lib/components/BackBtn.svelte';

	export let data: PageData;
	let animes: Writable<Anime[]>;

	let anime: Anime;
	let m3u8: Blob;
	let animeUrl: string;
	let epNumber: string;

	let time: number;

	let error: string;

	async function main() {
		let blob = await getM3U8('https://www.neko-sama.fr/anime/episode/' + data.params.episodeInfo);

		epNumber = /(-)([0-9]*)(-vostfr)/g.exec(data.params.episodeInfo)?.[2] as string;
		animeUrl = data.params.episodeInfo.replace('-' + epNumber, '');

		if (!blob) {
			error = "Désolé, il n'y a rien sur cette page. Cliquez sur le bouton retour pour continuer à utiliser notre application";
			return;
		}

		m3u8 = blob;
		animes = getStore('animes', await getAnimes());
		anime = await getAnime(animeUrl, $animes);
	}

	$: data.url, main();
</script>

{#key data.url}
	{#if anime && m3u8 && !error}
		<Player {m3u8} {anime} {epNumber} animes={$animes} url={'/anime/episode/' + data.params.episodeInfo} />
	{/if}

	{#if error}
		<BackBtn path={animeUrl} />
		<div class="grid place-items center">
			<p>{error}</p>
		</div>
	{/if}
{/key}
