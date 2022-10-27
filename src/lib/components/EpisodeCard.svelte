<script lang="ts">
	import type Episode from '$lib/types/Episode';

	export let episode: Episode;
</script>

<a href={episode.url}>
	<div class="relative group">
		<div class="img relative">
			<div class="absolute w-full h-full bg-slate-800 bg-opacity-90 group-hover:opacity-100 opacity-0 transition-opacity grid place-items-center">
				<span class="material-icons-outlined">play_arrow</span>
			</div>

			<img src={episode.url_image} alt="" class="cover-object w-full min-w-full aspect-video" />
		</div>

		<div class="flex justify-between items-center mt-3">
			<h5>Ep. {episode.episode}</h5>
			<p class="text-sm text-slate-300">{episode.time}</p>
		</div>
	</div>
</a>
