<script lang="ts">
	import changePage from '$lib/utils/changePage';
	import chunkify from '$lib/utils/chunkify';
	import { seen } from '$lib/stores/stores';

	let page = 0;

	let chunks: { ep: string; animeId: number; time: number; url: string; animeName: string; url_image: string; duration: number }[][];
	chunks = chunkify($seen, 14);
</script>

<!-- 
LES PLUS RECENTS
-->

<div class="grid grid-cols-7 gap-4">
	<div class="group flex justify-between text-xl uppercase col-span-full">
		<h1>Reprendre</h1>
	</div>

	{#if $seen && $seen[0] && chunks && chunks[0]}
		{#key page}
			{#each chunks[page] as episode}
				<a href={episode.url} class="group overflow-hidden">
					<div class="h-full w-full relative">
						<div class="relative w-full h-full">
							<div class="bg-red-500 h-1 absolute bottom-0 left-0 z-50" style="width: {Math.round((episode.time / episode.duration) * 100)}%" />
							<div class="bg-slate-300 h-1 absolute bottom-0 right-0 z-50" style="width: {100 - Math.round((episode.time / episode.duration) * 100)}%" />
							<img src={episode.url_image} alt="" class="object-cover aspect-[200/283] w-full h-full" />
						</div>

						<div class="bg-slate-800 bg-opacity-80 absolute w-full h-[35%] group-hover:h-full bottom-0 p-3 card">
							<h1 class="whitespace-nowrap text-ellipsis overflow-hidden text-xl group-hover:whitespace-normal">{episode.animeName}</h1>
							<p class="text-sm">Ep. {episode.ep}</p>
						</div>
					</div>
				</a>
			{/each}
		{/key}

		{#if chunks.length > 1}
			<div class="flex justify-between col-span-full">
				<button on:click={() => (page = changePage(page, -1, chunks.length))}><span class="material-icons">chevron_left</span></button>
				<p>{page + 1} / {chunks.length}</p>
				<button on:click={() => (page = changePage(page, 1, chunks.length))}><span class="material-icons">chevron_right</span></button>
			</div>
		{/if}
	{/if}
</div>
