<script lang="ts">
	import chunkify from '$lib/utils/chunkify';
	import { getStore } from '$lib/utils/hmr-stores';
	import AnimeCard from './AnimeCard.svelte';
	import Fuse from 'fuse.js';
	import MainGrid from './MainGrid.svelte';

	let searching = getStore('searching', false);
	let query = getStore('query', '');
	let animes = getStore('animes', []);
	let animesChunk = getStore('animesChunk', []);
	let searchPage = 0;

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

	$: $searching, ((searchPage = 0), scrollTo({ top: 0 }));

	$: $query,
		(async () => {
			if (!$query) return ($animesChunk = chunkify($animes, 40));

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

			const fuse = new Fuse($animes, options);
			const items = [];

			for (const item of fuse.search($query)) {
				items.push(item.item);
			}

			$animesChunk = chunkify(items, 40);
			searchPage = 0;
		})();
</script>

{#if $searching}
	<div class="grid grid-cols-3">
		<button class="place-self-start" on:click={() => ($searching = false)}>
			<span class="material-icons-outlined">arrow_back</span>
		</button>
		<h1 class="place-self-center">{document.title}</h1>
	</div>
{/if}

<input tabindex="-1" bind:value={$query} on:focus={() => ($searching = true)} type="text" class="w-full my-5 bg-gray-700 focus:outline-none p-5" placeholder="Chercher un anime, un OAV, etc..." />

{#if $searching}
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
