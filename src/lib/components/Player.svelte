<script>
	import { goto } from '$app/navigation';
	import { Hls, Ui, Controls, Control, DblClickFullscreen, LoadingScreen, PlaybackControl, ControlGroup, ClickToPlay, ControlSpacer, FullscreenControl, Scrim } from '@vime/svelte';
	import BackBtn from './BackBtn.svelte';
	import { seen } from '$lib/stores/stores';

	export let m3u8;
	export let anime;
	export let epNumber;
	export let animes;
	export let url;

	let ended = false;
	let startAt;

	let time;

	let h = window.innerHeight;
	let w = window.innerWidth;

	let source;
	let player;
	let duration = 0;

	function main() {
		startAt = $seen.filter((a) => a.animeId === anime.id && a.ep === epNumber)[0]?.time || 0.1;
	}

	$: m3u8, main();

	$: if (source && player) {
		let interval = setInterval(() => {
			let _ = document.querySelector('vm-player').duration;
			if (_ > 0) {
				duration = _;
				clearInterval(interval);
			}
		}, 200);
	}

	function onTimeUpdate(event) {
		if (event.detail < 1) return;
		time = event.detail;

		$seen = $seen.filter((a) => a.animeId !== anime.id);
		$seen = [
			...$seen,
			{
				ep: epNumber,
				animeId: anime.id,
				animeName: anime.title,
				url: url,
				time: time || 0,
				duration: duration,
				url_image: anime.url_image,
			},
		];
	}

	function gotoNextEp() {
		let nextEp = anime.episodes[Number(epNumber)];
		if (!nextEp) return;
		goto(nextEp.url);
	}

	function gotoPreviousEp() {
		let previousEp = anime.episodes[Number(epNumber) - 2];
		if (!previousEp) return;
		goto(previousEp.url);
	}

	function skip() {
		let nextEp = anime.episodes[Number(epNumber)];
		if (!nextEp) {
			ended = true;
		}
		$seen = $seen.filter((a) => a.animeId !== anime.id);
		goto(nextEp.url);
	}

	function random() {
		let rdmAnime = animes[Math.floor(Math.random() * animes.length)];
		goto(rdmAnime.url);
	}

	window.onkeydown = (e) => {
		if (duration < 0) return;

		if (e.code === 'Space') {
			pause();
		}

		if (e.code === 'KeyF') {
			fullScreen();
		}

		if (e.code === 'ArrowRight') {
			player.currentTime += 10;
		}

		if (e.code === 'ArrowLeft') {
			player.currentTime -= 10;
		}

		if (e.code === 'Semicolon') {
			mute();
		}
	};

	function fullScreen() {
		if (player.isFullscreenActive) player.exitFullscreen();
		else player.enterFullscreen();
	}

	function pause() {
		player.paused = !player.paused;
	}

	function mute() {
		player.muted = !player.muted;
	}
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />

<vm-player bind:this={player} on:dblclick={fullScreen} current-time={startAt} on:vmPlaybackEnded={skip} on:vmCurrentTimeChange={onTimeUpdate} aspect-ratio={w + ':' + h} autoplay="true">
	{#if ended}
		<div class="absolute z-[21] top-0 left-0 h-full w-full bg-slate-800 bg-opacity-80 grid place-items-center">
			<div class="text-center">
				<p class="text-4xl">Vous avez terminé cet anime ! 🎊</p>
				<button on:click={random} class="material-icons text-4xl mt-2">casino</button>
			</div>
		</div>
	{/if}

	<Hls version="latest">
		{#if m3u8}
			<source bind:this={source} data-src={URL.createObjectURL(m3u8)} type="application/x-mpegURL" />
		{/if}
	</Hls>

	<!-- eslint-disable -->
	<Ui>
		<LoadingScreen />
		<ClickToPlay />

		<Controls pin="top" fullWidth activeDuration={3200}>
			<Scrim gradient="down" style="--vm-scrim-z-index: 0" />
			<Control>
				<BackBtn path={anime.url} />
			</Control>
		</Controls>

		<Controls fullWidth activeDuration={3200} pin="bottomLeft">
			<Scrim gradient="up" style="--vm-scrim-z-index: -1" />

			<vm-control-group class="p-0 py-1">
				<vm-time-progress />
			</vm-control-group>

			<vm-control-group>
				<vm-scrubber-control />
			</vm-control-group>

			<ControlGroup space="top">
				<PlaybackControl keys="space" />

				<vm-control on:click={gotoPreviousEp}>
					<vm-icon src="/skip-previous.svg" />
				</vm-control>

				<vm-control on:click={gotoNextEp}>
					<vm-icon src="/skip-next.svg" />
				</vm-control>

				<ControlSpacer />
				<Control>
					<h1 class="text-sm">{anime.title} Ep. {epNumber}</h1>
				</Control>
				<ControlSpacer />
				<vm-volume-control keys="m" />
				<vm-fullscreen-control keys="f" />
			</ControlGroup>
		</Controls>
	</Ui>
</vm-player>
