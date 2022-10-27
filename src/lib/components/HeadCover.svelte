<script lang="ts">
	import type Anime from '$lib/types/Anime';

	export let _anime: Anime;
</script>

<div class="h-[70vh] w-full absolute top-0 left-0 z-[-1]">
	<img src={_anime.cover} alt="" class="object-cover w-full h-full cover" />
</div>

<style>
	.cover {
		-webkit-mask-image: linear-gradient(black, transparent);
		mask-image: linear-gradient(black, transparent);
		opacity: 40%;
	}
</style>
