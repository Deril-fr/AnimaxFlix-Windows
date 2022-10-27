<script lang="ts">
	import type Anime from '$lib/types/Anime';
	import MainGrid from './MainGrid.svelte';

	export let category: { chunks: Anime[][]; number: number; genre: string };
</script>

<MainGrid>
	<div class="col-span-full col-start-2 col-end-9 flex justify-between grid-rows-[5px]">
		<button class="text-xl font-semibold uppercase flex items-center">
			{category.genre}
			<span class="ml-2 text-green-300 material-icons-outlined">link</span>
		</button>
	</div>
</MainGrid>
