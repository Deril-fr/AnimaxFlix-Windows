<script lang="ts">
	import { goto } from '$app/navigation';
	import chunkify from '$lib/utils/chunkify';
	import { getStore } from '$lib/utils/hmr-stores';

	export let path: string;

	let searching = getStore('searching', false);
	let query = getStore('query', '');

	function back() {
		$searching = false;
		$query = '';

		goto(path);
	}
</script>

<button on:click={back} class="material-icons-outlined z-[9999999]">arrow_back</button>
