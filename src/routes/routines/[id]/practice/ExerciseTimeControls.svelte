<script lang="ts">
	import ArrowPath from '$lib/icons/ArrowPath.svelte';
	import ChevronDoubleLeft from '$lib/icons/ChevronDoubleLeft.svelte';
	import ChevronDoubleRight from '$lib/icons/ChevronDoubleRight.svelte';
	import Pause from '$lib/icons/Pause.svelte';
	import Play from '$lib/icons/Play.svelte';
	import { formatDuration } from '$lib/time';
	import { onDestroy } from 'svelte';

	export let onPrevious: () => void;
	export let onNext: () => void;
	export let onAutoplayToggled: (autoplay: boolean) => void;

	export let duration = 65000;

	export let autoplay: boolean;
	let timerEnd: number;
	let remainingTime = duration;
	let timer = remainingTime;
	let currentTimeout: number | undefined;
	let state: 'playing' | 'paused' | 'stopped' = 'paused';

	const toggleAutoplay = () => {
		autoplay = !autoplay;
		onAutoplayToggled(autoplay);
	}

	const tick = () => {
		timer = timerEnd - new Date().valueOf();
		if (timer > 0) {
			currentTimeout = setTimeout(tick, 100);
		} else {
			if (autoplay) {
				onNext();
			}
			currentTimeout = undefined;
			state = 'stopped';
		}
	};

	const start = () => {
		timerEnd = new Date().valueOf() + remainingTime;
		timer = remainingTime;
		state = 'playing';
		tick();
	};

	const pause = () => {
		clearTimeout(currentTimeout);
		remainingTime = timerEnd - new Date().valueOf();
		state = 'paused';
	};

	const resume = () => {
		start();
	};

	if (autoplay) {
		start();
	}

	onDestroy(() => {
		if (currentTimeout) {
			clearTimeout(currentTimeout);
		}
	});
</script>

<progress
	class="progress progress-primary w-full rounded-none progress-rounded-none"
	value={(100 * (duration - timer)) / duration}
	max="100"
></progress>
<div class="controls flex justify-between gap-4">
	<div>
		<button class="btn btn-sm" aria-label="Pause" on:click={onPrevious}>
			<ChevronDoubleLeft />
		</button>
		{#if state === 'playing'}
			<button class="btn btn-sm" aria-label="Pause" on:click={pause}>
				<Pause size="size-6" />
			</button>
		{:else if state === 'paused'}
			<button class="btn btn-sm" aria-label="Play" on:click={resume}>
				<Play size="size-6" />
			</button>
		{:else}
			<button class="btn btn-sm" aria-label="Restart" on:click={resume}>
				<ArrowPath />
			</button>
		{/if}
		<button class="btn btn-sm" aria-label="Pause" on:click={onNext}>
			<ChevronDoubleRight />
		</button>
	</div>
	<div class="grow"></div>
	<div class="flex">
		<label class="label cursor-pointer gap-2">
			<span class="label-text">Autoplay</span>
			<input type="checkbox" class="toggle toggle-primary" checked={autoplay} on:click={toggleAutoplay} />
		</label>
	</div>
		<span class="inline-flex font-mono text-lg items-center">
			{formatDuration(Math.trunc((duration - timer) / 1000))}<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="m9 20.247 6-16.5" />
			</svg>
			{formatDuration(Math.trunc(duration / 1000))}
		</span>
</div>

<style>
	.progress-rounded-none::-moz-progress-bar, .progress-rounded-none::-webkit-progress-bar {
		border-radius: 0;
	}
</style>