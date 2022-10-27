<script lang="ts">
	import type RecentEpisode from '$lib/types/RecentEpisode';
	import changePage from '$lib/utils/changePage';
	import chunkify from '$lib/utils/chunkify';
	import type { Writable } from 'svelte/store';

	export let recentEpisodes: Writable<RecentEpisode[]>;

	let recentEpisodePage = 0;
	let recentEpisodesChunk: RecentEpisode[][];

	$: if (recentEpisodes) {
		recentEpisodesChunk = chunkify($recentEpisodes, 14);
	}
</script>

<!-- 
LES PLUS RECENTS
-->

<div class="grid grid-cols-7 gap-4">
	<div class="group flex justify-between text-xl uppercase col-span-full">
		<h1>Les plus récent</h1>
	</div>

	{#if recentEpisodes && $recentEpisodes[0] && recentEpisodesChunk}
		{#each recentEpisodesChunk[recentEpisodePage] as episode}
			{#key recentEpisodePage}
				<a href={episode.url} class="group">
					<div class="relative">
						<div class="img w-full h-full">
							<img src={episode.url_image.replace('3', '2')} alt="" class="object-full w-full h-full aspect-[200/283]" />
						</div>
						<div class="absolute w-full h-[35%] group-hover:h-full bg-slate-800 bg-opacity-80 z-50 bottom-0 p-3 card">
							<h1 class="whitespace-nowrap overflow-hidden text-ellipsis group-hover:whitespace-normal">{episode.title}</h1>

							<div class="flex justify-between">
								<p class="text-slate-300">{episode.time}</p>
								<p class="whitespace-nowrap ml-2 text-slate-300">{episode.episode}</p>
							</div>
						</div>
					</div>
				</a>
			{/key}
		{/each}

		<div class="flex justify-between col-span-full">
			<button on:click={() => (recentEpisodePage = changePage(recentEpisodePage, -1, recentEpisodesChunk.length))}><span class="material-icons">chevron_left</span></button>
			<p>{recentEpisodePage + 1} / {recentEpisodesChunk.length}</p>
			<button on:click={() => (recentEpisodePage = changePage(recentEpisodePage, 1, recentEpisodesChunk.length))}><span class="material-icons">chevron_right</span></button>
		</div>
	{/if}
</div>
