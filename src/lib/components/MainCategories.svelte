<script lang="ts">
	import type Anime from '$lib/types/Anime';
	import { getStore } from '$lib/utils/hmr-stores';
	import type { Writable } from 'svelte/store';
	import MainAnimeCategory from './MainAnimeCategory.svelte';
	import MainCategoryTitle from './MainCategoryTitle.svelte';

	let categories: Writable<{ chunks: Anime[][]; number: number; genre: string }[]> = getStore('categories', []);
</script>

{#if $categories}
	{#each $categories as category}
		<div class="mt-5">
			<div class="grid gap-4 grid-rows-[40px_1fr] items-center w-full">
				<MainCategoryTitle {category} />
				<MainAnimeCategory {category} />
			</div>
		</div>
	{/each}
{:else}
	<div class="h-full w-full absolute bg-slate-900 grid place-items-center">
		<span class="material-icons animate-spin text-6xl">autorenew</span>
	</div>
{/if}
