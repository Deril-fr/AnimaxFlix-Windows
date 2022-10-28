<script lang="ts">
	import chunkify from '$lib/utils/chunkify';
	import { getStore } from '$lib/utils/hmr-stores';
	import AnimeCard from './AnimeCard.svelte';
	import Fuse from 'fuse.js';
	import MainGrid from './MainGrid.svelte';
	import Genre from '$lib/types/Genre';
	import type Anime from '$lib/types/Anime';

	let searching = getStore('searching', false);
	let query = getStore('query', '');
	let animes = getStore('animes', []);
	let animesChunk = getStore('animesChunk', []);
	let searchPage = 0;

	let filters: (keyof typeof Genre)[] = [];

	function changePage(n: number) {
		scrollTo({ top: 0 });

		if (searchPage + n === $animesChunk.length) {
			searchPage = 0;
		} else if (searchPage + n === -1) {
			searchPage = $animesChunk.length - 1;
		} else {
			searchPage += n;
		}
	}

	$: $searching, ((searchPage = 0), scrollTo({ top: 0 }), (filters = []));

	$: (async () => {
		let animes_search = $animes;

		if (filters[0]) {
			for (const filter of filters) {
				animes_search = animes_search.filter((a: Anime) => a.genres.includes(filter));
				console.log(animes_search.length);
			}
		}

		if (!$query) return ($animesChunk = chunkify(animes_search, 40));

		let lastQuery = $query;
		let ok = true;

		await new Promise((resolve) => {
			setTimeout(() => {
				if (lastQuery !== $query) ok = false;
				resolve(null);
			}, 300);
		});

		if (!ok) return;

		const options = {
			keys: ['title', 'title_romanju', 'title_english', 'title_french', 'others'],
		};

		const fuse = new Fuse(animes_search, options);

		let items = [];
		for (const item of fuse.search($query)) {
			items.push(item.item);
		}

		$animesChunk = chunkify(items, 40);
		searchPage = 0;
	})();

	function filter(genre: keyof typeof Genre, elem: HTMLButtonElement) {
		console.log(elem.className);

		if (filters.includes(genre)) return (filters = filters.filter((a) => a !== genre));
		filters = [...filters, genre];
	}
</script>

{#if $searching}
	<div class="grid grid-cols-3">
		<button class="place-self-start" on:click={() => ($searching = false)}>
			<span class="material-icons-outlined">arrow_back</span>
		</button>
		<h1 class="place-self-center">{document.title}</h1>
	</div>
{/if}

<input tabindex="-1" bind:value={$query} on:focus={() => ($searching = true)} type="text" class="w-full bg-gray-700 focus:outline-none p-5" placeholder="Chercher un anime, un OAV, etc..." />

{#if $searching}
	<div class="flex flex-wrap">
		{#each Object.keys(Genre) as genre}
			<button class="p-2 {filters.includes(genre) ? 'bg-white text-slate-900' : ''}" on:click={(e) => filter(genre, e.target)}>{Genre[genre]}</button>
		{/each}
	</div>

	{#key searchPage}
		{#key $animesChunk}
			<div class="top-0 left-0 grid grid-cols-5 2xl:grid-cols-8 gap-6 mt-10">
				{#each $animesChunk[searchPage] as anime}
					<AnimeCard {anime} />
				{/each}
			</div>
		{/key}
	{/key}

	<div class="flex justify-between py-5 mt-5">
		<button on:click={() => changePage(-1)} class="material-icons-outlined">chevron_left</button>
		<p>{searchPage + 1}/{$animesChunk.length}</p>
		<button on:click={() => changePage(+1)} class="material-icons-outlined">chevron_right</button>
	</div>
{/if}
