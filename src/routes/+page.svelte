<script lang="ts">
	import { getStore } from '$lib/utils/hmr-stores';
	import type { Writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import type Anime from '$lib/types/Anime';
	import chunkify from '$lib/utils/chunkify';
	import Search from '$lib/components/Search.svelte';
	import getAnimes from '$lib/utils/getAnimes';
	import AnimeCard from '$lib/components/AnimeCard.svelte';
	import type RecentEpisode from '$lib/types/RecentEpisode';
	import MostRecent from '$lib/components/MostRecent.svelte';
	import Seen from '$lib/components/Seen.svelte';
	import type { PageData } from './$types';

	let animes: Writable<Anime[]> = getStore('animes', []);
	let animesChunk: Writable<Anime[][]>;
	let recentEpisodes: Writable<RecentEpisode[]>;
	let query: Writable<string>;

	let searching = getStore('searching', false);

	onMount(async () => {
		$animes = await getAnimes();
		$animes = $animes.sort((a, b) => (a.popularity < b.popularity ? 1 : b.popularity < a.popularity ? -1 : 0));
	});

	$: if ($animes[0]) {
		animesChunk = getStore('animesChunk', chunkify($animes, 40));
		getRecentEpisodes();

		async function getRecentEpisodes() {
			let res = await fetch('https://www.neko-sama.fr');
			let json = JSON.parse(/(var lastEpisodes = )(.*)(;)/gm.exec(await res.text())?.[2] as string);
			recentEpisodes = getStore('recent_animes', json);
		}

		query = getStore('query', '');
	}
</script>

<main class="my-10 relative grid grid-cols-1 gap-10">
	<Search />

	{#if !$searching}
		<Seen />
		<MostRecent {recentEpisodes} />

		<div class="grid grid-cols-5 gap-4">
			<div class="group flex justify-between hover:text-slate-200 text-xl uppercase col-span-full hover:cursor-pointer" on:click={() => ($searching = true)}>
				<h1>Les plus populaire</h1>
			</div>

			{#if animes && $animes[0]}
				{#each $animes.slice(0, 15) as anime}
					<AnimeCard {anime} />
				{/each}
			{/if}
		</div>
	{/if}
</main>
