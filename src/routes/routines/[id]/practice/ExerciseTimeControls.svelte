<script lang="ts">
	import ArrowPath from '$lib/icons/ArrowPath.svelte';
	import ChevronDoubleLeft from '$lib/icons/ChevronDoubleLeft.svelte';
	import ChevronDoubleRight from '$lib/icons/ChevronDoubleRight.svelte';
	import Pause from '$lib/icons/Pause.svelte';
	import Play from '$lib/icons/Play.svelte';
	import { formatDuration } from '$lib/time';
	import { createTimer } from '$lib/timer';

	export let onPrevious: () => void;
	export let onComplete: (autoplay: boolean) => Promise<void>;
	export let onNext: () => void;
	export let onAutoplayToggled: (autoplay: boolean) => void;

	export let duration = 65000;

	export let autoplay: boolean;

	const toggleAutoplay = () => {
		autoplay = !autoplay;
		onAutoplayToggled(autoplay);
	};

	async function onTimerDone() {
		onComplete(autoplay);
	}

	const timer = createTimer(duration, onTimerDone);

	if (autoplay) {
		timer.start();
	}
</script>

<progress
	class="progress progress-secondary w-full rounded-none progress-rounded-none"
	value={(100 * ($timer.duration - $timer.remainingTime)) / duration}
	max="100"
></progress>
<div class="controls flex justify-between gap-4 px-4 text-slate-300">
	<div>
		<button class="btn btn-ghost btn-sm" aria-label="Previous Exercise" on:click={onPrevious}>
			<ChevronDoubleLeft />
		</button>
		{#if $timer.state === 'playing'}
			<button class="btn btn-ghost btn-sm" aria-label="Pause" on:click={timer.stop}>
				<Pause size="size-6" />
			</button>
		{:else if $timer.state === 'stopped' && $timer.remainingTime != 0}
			<button class="btn btn-ghost btn-sm" aria-label="Play" on:click={timer.start}>
				<Play size="size-6" />
			</button>
		{:else}
			<button class="btn btn-ghost btn-sm" aria-label="Restart" on:click={timer.start}>
				<ArrowPath />
			</button>
		{/if}
		<button class="btn btn-ghost btn-sm" aria-label="Next Exercise" on:click={onNext}>
			<ChevronDoubleRight />
		</button>
	</div>
	<div class="grow"></div>
	<div class="flex">
		<label class="label cursor-pointer gap-2">
			<span class="label-text text-slate-300">Autoplay</span>
			<input
				type="checkbox"
				class="toggle toggle-secondary colors-inverted"
				checked={autoplay}
				on:click={toggleAutoplay}
			/>
		</label>
	</div>
	<span class="inline-flex font-mono text-lg items-center">
		{formatDuration(Math.trunc(($timer.duration - $timer.remainingTime) / 1000))}<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-6"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="m9 20.247 6-16.5" />
		</svg>
		{formatDuration(Math.trunc($timer.duration / 1000))}
	</span>
</div>

<style>
	.progress-rounded-none::-moz-progress-bar,
	.progress-rounded-none::-webkit-progress-bar {
		border-radius: 0;
	}

	.colors-inverted {
		--tglbg: var(--fallback-n, oklch(var(--n) / 1));
		background-color: var(--fallback-nc, oklch(var(--nc) / 1));
	}

	.colors-inverted.toggle-secondary:checked {
		border-color: var(--fallback-s, oklch(var(--s) / var(--tw-border-opacity)));
		--tw-border-opacity: 0.1;
		--tw-bg-opacity: 1;
		background-color: var(--fallback-s, oklch(var(--s) / var(--tw-bg-opacity)));
		--tw-text-opacity: 1;
		color: var(--fallback-sc, oklch(var(--sc) / var(--tw-text-opacity)));
	}
</style>
