<script lang="ts">
	import type Anime from '$lib/types/Anime';
	import AnimeCard from './AnimeCard.svelte';
	import MainGrid from './MainGrid.svelte';

	export let category: { chunks: Anime[][]; number: number; genre: string };

	function changePage(category: { chunks: Anime[][]; number: number; genre: string }, n: number) {
		if (category.number + n === category.chunks.length) {
			return 0;
		} else if (category.number + n === -1) {
			return category.chunks.length - 1;
		} else {
			return category.number + n;
		}
	}
</script>

{#key category}
	<MainGrid>
		<button
			on:click={() => {
				category.number = changePage(category, -1);
			}}
		>
			<span class="material-icons">chevron_left</span>
		</button>

		{#each category.chunks[category.number] as anime}
			<AnimeCard {anime} />
		{/each}

		<button
			class="col-start-9"
			on:click={() => {
				category.number = changePage(category, +1);
			}}
		>
			<span class="material-icons">chevron_right</span>
		</button>
	</MainGrid>
{/key}
