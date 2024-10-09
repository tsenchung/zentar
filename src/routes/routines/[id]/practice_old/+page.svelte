<script lang="ts">
	import Metronome from '$lib/components/metronome/Metronome.svelte';
	import Timer from '$lib/components/Timer.svelte';
	import ChevronDoubleLeft from '$lib/icons/ChevronDoubleLeft.svelte';
	import ChevronDoubleRight from '$lib/icons/ChevronDoubleRight.svelte';
	import { onDestroy } from 'svelte';

	export let data;
	let currentIndex = 0;
	$: currentTuple = data.exercises[currentIndex];
	$: currentRoutineExercise = currentTuple[0];
	$: currentExercise = currentTuple[1];
	let done = false;

	function nextExercise() {
		if (currentIndex + 1 < data.exercises.length) {
			currentIndex = currentIndex + 1;
		} else {
			done = true;
		}
	}

	function previousExercise() {
		if (currentIndex > 0) {
			currentIndex = currentIndex - 1;
		}
	}

	onDestroy(() => {
		data.client.close();
	});
</script>

<main>
	<h1 class="text-2xl">{data.practiceRoutine.name}</h1>
	<div class="flex justify-between items-start mt-4">
		<button class="btn btn-circle" aria-label="Previous exercise" on:click={previousExercise}>
			<ChevronDoubleLeft />
		</button>
		<div class="overflow-x-auto">
			<ul class="steps steps-vertical lg:steps-horizontal">
				{#each data.exercises as exercise, i}
					<li class="step {i <= currentIndex ? 'step-primary' : ''}"></li>
				{/each}
			</ul>
		</div>
		<button class="btn btn-circle" on:click={nextExercise}>
			<ChevronDoubleRight />
		</button>
	</div>
	<div>
		<div class="exercise flex flex-col items-center mb-8">
			<div class="mb-4">
				<h2 class="text-3xl">{currentExercise?.title}</h2>
			</div>
			<section class="overflow-scroll">
				<pre class="inline text-lg">
{currentExercise?.aid.text}
				</pre>
			</section>
		</div>
	</div>
	<div class="divider"></div>
	<div class="grid grid-cols-2 gap-4">
		<div class="timer grow">
			{#key currentRoutineExercise.id}
				<Timer duration={currentRoutineExercise.duration * 1000} onEnd={nextExercise} />
			{/key}
		</div>
		<div class="metronome w-10/12 h-56"><Metronome /></div>
	</div>
	{#if done}
		<span>Wahooooo</span>
	{/if}
</main>
