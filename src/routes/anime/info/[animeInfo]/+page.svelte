<script lang="ts">
	import BackBtn from '$lib/components/BackBtn.svelte';
	import type Anime from '$lib/types/Anime';
	import type { PageData } from './$types';
	import getAnimes from '$lib/utils/getAnimes';
	import type { Writable } from 'svelte/store';
	import type Episode from '$lib/types/Episode';
	import chunkify from '$lib/utils/chunkify';
	import changePage from '$lib/utils/changePage';
	import getAnime from '$lib/utils/getAnime';
	import HeadCover from '$lib/components/HeadCover.svelte';
	import EpisodeCard from '$lib/components/EpisodeCard.svelte';
	import EpisodeInfoSkeleton from '$lib/components/EpisodeInfoSkeleton.svelte';
	import { getStore } from '$lib/utils/hmr-stores';

	export let data: PageData;

	let animes: Writable<Anime[]>;

	let _anime: Anime;
	let _episodesChunk: Episode[][];
	let _episodePage = 0;

	async function main() {
		animes = getStore('anime', await getAnimes());
		_anime = await getAnime(data.params.animeInfo, $animes);

		_episodesChunk = chunkify(_anime.episodes, 40);
	}

	main();
</script>

<main class="mx-[20vw] mt-10">
	{#if _anime && _anime.episodes}
		<BackBtn path="/" />
		<HeadCover {_anime} />

		<div class="grid lg:grid-cols-[.5fr_1fr] mt-10">
			<img src={_anime.url_image} alt="" class="cover-object w-full aspect-[200/283]" />
			<div class="lg:ml-10 mt-10 lg:mt-0">
				<h1 class="text-2xl font-semibold">{_anime.title}</h1>
				<p class="text-slate-300 mt-1 mb-3">{_anime.genres.join(', ')}</p>
				<p>{_anime.synopsis}</p>

				<div class="grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 my-10 gap-4">
					<div class="flex justify-between col-span-full">
						<button class="material-icons-outlined" on:click={() => (_episodePage = changePage(_episodePage, -1, _episodesChunk.length))}>chevron_left</button>
						<p>{_episodePage + 1} / {_episodesChunk.length}</p>
						<button class="material-icons-outlined" on:click={() => (_episodePage = changePage(_episodePage, 1, _episodesChunk.length))}>chevron_right</button>
					</div>

					{#key _episodePage}
						{#each _episodesChunk[_episodePage] as episode}
							<EpisodeCard {episode} />
						{/each}
					{/key}

					<div class="flex justify-between col-span-full">
						<button class="material-icons-outlined" on:click={() => (_episodePage = changePage(_episodePage, -1, _episodesChunk.length))}>chevron_left</button>
						<p>{_episodePage + 1} / {_episodesChunk.length}</p>
						<button class="material-icons-outlined" on:click={() => (_episodePage = changePage(_episodePage, 1, _episodesChunk.length))}>chevron_right</button>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<EpisodeInfoSkeleton />
	{/if}
</main>
