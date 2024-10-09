<script lang="ts">
	import ArrowPath from '$lib/icons/ArrowPath.svelte';
	import Pause from '$lib/icons/Pause.svelte';
	import Play from '$lib/icons/Play.svelte';
import { formatDuration } from '$lib/time';
	import { onDestroy } from 'svelte';

	export let onEnd: () => void;
	export let duration = 65000;
	let timerEnd: number;
	let timer = 0;
	let currentTimeout: number | undefined;
	let state: 'playing' | 'paused' | 'stopped' = 'paused';

	const tick = () => {
		timer = timerEnd - new Date().valueOf();
		if (timer > 0) {
			currentTimeout = setTimeout(tick, 100);
		} else {
			onEnd();
			currentTimeout = undefined;
			state = 'stopped';
		}
	};

	const start = () => {
		timerEnd = new Date().valueOf() + duration;
		timer = duration;
		state = 'playing';
		tick();
	};

	const pause = () => {
		clearTimeout(currentTimeout);
		duration = timerEnd - new Date().valueOf();
		state = 'paused';
	};

	const resume = () => {
		start();
	};

	start();

	onDestroy(() => {
		if (currentTimeout) {
			clearTimeout(currentTimeout);
		}
	});
</script>

<div class="flex flex-col items-center gap-4">
	<div
		class="radial-progress"
		style="--value:{Math.round(100 * (100 * (duration - timer)) / duration) / 100}; --size:10rem; --thickness: .25rem;"
		role="progressbar"
	>
		<span class="inline-flex font-mono text-3xl">
			{formatDuration(Math.trunc(timer / 1000))}
		</span>
	</div>
	<div>
		{#if state === 'playing' }
		<button class="btn btn-circle" aria-label="Pause" on:click={pause}>
			<Pause size="size-6" />
		</button>
		{:else if state === 'paused'}
		<button class="btn btn-circle" aria-label="Play" on:click={resume}>
			<Play size="size-6" />
		</button>
		{:else}
		<button class="btn btn-circle" aria-label="Restart" on:click={resume}>
			<ArrowPath />
		</button>
		{/if}
	</div>
</div>
