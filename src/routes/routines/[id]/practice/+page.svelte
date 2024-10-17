<script lang="ts" context="module">
	import { browser } from '$app/environment';
	import NotificationSoundDone from './179198__snapper4298__micro_bell.wav';

	let audioCtx: AudioContext | undefined;
	let bufferDoneNotification: AudioBuffer | undefined;
	if (browser) {
		audioCtx = new AudioContext();
		audioCtx.suspend();
		getBuffers();
	}

	async function getBuffers() {
		const response = await fetch(NotificationSoundDone);
		bufferDoneNotification = await audioCtx!.decodeAudioData(await response.arrayBuffer());
	}
</script>

<script lang="ts">
	import Metronome from '$lib/components/metronome/Metronome.svelte';
	import ExerciseTimeControls from './ExerciseTimeControls.svelte';
	import Header from '$lib/components/Header.svelte';
	import GuitarVisualization from '$lib/components/GuitarVisualization.svelte';
	import { fretboardSettings } from '$lib/settings';
	import { createTimer, type ReadableTimer, type Timer } from '$lib/timer';
	import type { Unsubscriber } from 'svelte/store';
	import { onDestroy } from 'svelte';

	export let data;
	let autoplay: boolean = false;
	let currentIndex = 0;
	$: currentTuple = data.exercises.length > 0 ? data.exercises[currentIndex] : undefined;
	$: currentRoutineExercise = currentTuple ? currentTuple[0] : undefined;
	$: currentExercise = currentTuple ? currentTuple[1] : undefined;

	let nextExerciseTimer: ReadableTimer | undefined;
	let nextExerciseTimerUnsubscribe: Unsubscriber | undefined;
	let nextExerciseTimerState: Timer | undefined;

	function updateNextExerciseTimerState(nextState: Timer) {
		nextExerciseTimerState = nextState;
	}

	async function onExerciseComplete(autoplay: boolean) {
		if (audioCtx && bufferDoneNotification) {
			const source = audioCtx.createBufferSource();
			source.buffer = bufferDoneNotification;
			source.connect(audioCtx.destination);
			source.addEventListener('ended', () => {
				source.disconnect();
				audioCtx.suspend();
			});
			source.start();
			audioCtx.resume();
		}
		if (autoplay && currentIndex + 1 < data.exercises.length) {
			nextExerciseTimer = createTimer(3000, async () => {
				if (nextExerciseTimerUnsubscribe) {
					nextExerciseTimerUnsubscribe();
				}
				nextExerciseTimer = undefined;
				nextExerciseTimerState = undefined;
				nextExercise();
			});
			nextExerciseTimer.start();
			nextExerciseTimerUnsubscribe = nextExerciseTimer.subscribe(updateNextExerciseTimerState);
		}
	}

	function nextExercise() {
		if (currentIndex + 1 < data.exercises.length) {
			currentIndex = currentIndex + 1;
			scrollToCurrentExercise();
		}
	}

	function previousExercise() {
		if (currentIndex > 0) {
			currentIndex = currentIndex - 1;
			scrollToCurrentExercise();
		}
	}

	function scrollToCurrentExercise() {
		const steps = document.querySelector('.exercises');
		const step = document.querySelector('.exercises li:nth-child(' + (currentIndex + 1) + ')');
		if (steps && step) {
			const stepsRect = steps.getBoundingClientRect();
			const stepRect = step.getBoundingClientRect();
			const scrollTo = stepRect.top - stepsRect.top + steps.scrollTop;
			steps.scroll({ top: scrollTo, behavior: 'smooth' });
		}
	}

	onDestroy(() => {
		if (nextExerciseTimerUnsubscribe) {
			nextExerciseTimerUnsubscribe();
			nextExerciseTimerUnsubscribe = undefined;
		}
	});
</script>

<svelte:head>
	<title>Practice - {data.practiceRoutine.name}</title>
</svelte:head>
{#if data.exercises.length > 0}
	<main>
		<Header>
			<ul slot="breadcrumbs">
				<li><a href="/routines">Routines</a></li>
				<li><a href="/routines/{data.practiceRoutine.id}">{data.practiceRoutine.name}</a></li>
				<li>Practice</li>
			</ul>
			<svelte:fragment slot="title">{data.practiceRoutine.name}</svelte:fragment>
		</Header>
		<section class="exercise bg-slate-950 text-slate-200">
			<h2 class="sr-only">{currentExercise?.title}</h2>
			<div class="flex justify-center items-center p-4 min-h-[50lvh]">
				<section class="overflow-scroll">
					{#if currentExercise?.aid.type == 'AidText'}
						<pre class="inline text-lg">
{currentExercise?.aid.text}
						</pre>
					{:else if currentExercise?.aid.type == 'AidVisualizer'}
						<GuitarVisualization
							options={$fretboardSettings}
							highlightMode={currentExercise.aid.highlightMode}
						/>
					{/if}
				</section>
			</div>
			{#if nextExerciseTimerState}
				<div class="toast toast-top">
					<div class="alert alert-info">
						<span
							>Next exercise starting in {Math.ceil(nextExerciseTimerState.remainingTime / 1000)} seconds</span
						>
					</div>
				</div>
			{/if}
			{#if currentRoutineExercise}
				{#key currentRoutineExercise.id}
					<ExerciseTimeControls
						duration={currentRoutineExercise.duration * 1000}
						{autoplay}
						onAutoplayToggled={(ap) => {
							autoplay = ap;
						}}
						onPrevious={previousExercise}
						onComplete={onExerciseComplete}
						onNext={nextExercise}
					/>
				{/key}
			{/if}
		</section>

		<div class="flex flex-row mt-4">
			<div class="grow">
				<div class="flex justify-start items-center gap-4 h-5">
					<span class="text-2xl" aria-hidden="true">{currentExercise?.title}</span>
				</div>
				<div class="metronome w-96 h-56 mt-8"><Metronome /></div>
			</div>
			<div>
				<h3 class="text-2xl">Exercises</h3>
				<ul class="exercises steps steps-vertical w-96 h-56 overflow-y-auto">
					{#each data.exercises as exercise, i}
						<li class="step {i <= currentIndex ? 'step-primary' : ''}">
							<button
								on:click={() => {
									currentIndex = i;
								}}
							>
								{exercise[1]?.title}
							</button>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</main>
{:else}
	<main>
		<Header>
			<ul slot="breadcrumbs">
				<li><a href="/routines">Routines</a></li>
				<li><a href="/routines/{data.practiceRoutine.id}">{data.practiceRoutine.name}</a></li>
				<li>Practice</li>
			</ul>
			<svelte:fragment slot="title">{data.practiceRoutine.name}</svelte:fragment>
		</Header>
		<p>
			This routine does not have any exercises yet.
			<a class="link link-primary" href="/routines/{data.practiceRoutine.id}"> Click&nbsp;here </a>
			to add exercises to the routine.
		</p>
	</main>
{/if}
