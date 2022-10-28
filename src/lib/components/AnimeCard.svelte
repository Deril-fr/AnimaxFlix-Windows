<script>
	import { getStore } from '$lib/utils/hmr-stores';

	export let anime;

	let previous = getStore('previous_url', '');
</script>

<a href={anime.url} on:click={() => ($previous = location.pathname)} class="group relative">
	<div class="card absolute w-full h-[40%] 2xl:h-[35%] group-hover:h-full p-4 bg-slate-800 bg-opacity-80 overflow-hidden bottom-0 z-[99999]">
		<h6 class="whitespace-nowrap text-ellipsis overflow-hidden group-hover:whitespace-normal">{anime.title_english || anime.title}</h6>
		<p>{anime.start_date_year}</p>
	</div>
	<div class="img">
		<img src={anime.url_image} class="object-cover w-full aspect-[200/283]" alt="" />
	</div>
</a>
