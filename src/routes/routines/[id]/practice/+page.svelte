<script lang="ts">
	import Metronome from '$lib/components/metronome/Metronome.svelte';
	import { onDestroy } from 'svelte';
	import ExerciseTimeControls from './ExerciseTimeControls.svelte';

	export let data;
	let autoplay: boolean = false;
	let currentIndex = 0;
	$: currentTuple = data.exercises[currentIndex];
	$: currentRoutineExercise = currentTuple[0];
	$: currentExercise = currentTuple[1];

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
		data.client.close();
	});
</script>

<main>
	<div class="exercise bg-slate-950 text-slate-200">
		<div class="flex justify-center items-center p-4 min-h-[50lvh]">
			<section class="overflow-scroll">
				<pre class="inline text-lg">
{currentExercise?.aid.text}
				</pre>
			</section>
		</div>
		{#key currentRoutineExercise.id}
			<ExerciseTimeControls
				duration={currentRoutineExercise.duration * 1000}
				{autoplay}
				onAutoplayToggled={(ap) => {
					autoplay = ap;
				}}
				onPrevious={previousExercise}
				onNext={nextExercise}
			/>
		{/key}
	</div>

	<div class="flex flex-row mt-4">
		<div class="grow">
			<div class="flex justify-start items-center gap-4 h-5">
				<h1 class="text-2xl">{data.practiceRoutine.name}</h1>
				/
				<h2 class="text-2xl">{currentExercise?.title}</h2>
			</div>
			<div class="metronome w-5/12 h-56 mt-8"><Metronome /></div>
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
