<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';

	let ready: boolean = false;
	onMount(() => {
		ready = true;
	});
</script>

<svelte:head>
	<link href="https://unpkg.com/placeholdifier/placeholdifier.css" rel="stylesheet" />
</svelte:head>

<div class="dragbar" />

{#if ready}
	<div data-sveltekit-prefetch>
		<slot />
	</div>
{/if}
