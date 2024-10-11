<script lang="ts">
	import Metronome from '$lib/components/metronome/Metronome.svelte';
	import Timer from '$lib/components/Timer.svelte';
	import ChevronDoubleLeft from '$lib/icons/ChevronDoubleLeft.svelte';
	import ChevronDoubleRight from '$lib/icons/ChevronDoubleRight.svelte';
	import { onDestroy } from 'svelte';
	import ExerciseTimeControls from './ExerciseTimeControls.svelte';
	import Bars3 from '$lib/icons/Bars3.svelte';

	export let data;
	let autoplay: boolean = false;
	let currentIndex = 0;
	$: currentTuple = data.exercises[currentIndex];
	$: currentRoutineExercise = currentTuple[0];
	$: currentExercise = currentTuple[1];

	function nextExercise() {
		if (currentIndex + 1 < data.exercises.length) {
			currentIndex = currentIndex + 1;
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
	<div>
		<div class="exercise flex flex-col items-center mb-8">
			<section class="overflow-scroll">
				<pre class="inline text-lg">
{currentExercise?.aid.text}
				</pre>
			</section>
		</div>
	</div>
	{#key currentRoutineExercise.id}
		<ExerciseTimeControls
			duration={currentRoutineExercise.duration * 1000}
			{autoplay}
			onAutoplayToggled={(ap) => {autoplay = ap}}
			onPrevious={previousExercise}
			onNext={nextExercise}
		/>
	{/key}
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
			<ul class="steps steps-vertical w-96 h-56 overflow-y-auto">
				{#each data.exercises as exercise, i}
					<li class="step {i <= currentIndex ? 'step-primary' : ''}">
						<button on:click={() => { currentIndex = i; }}>
							{exercise[1]?.title}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
	
	<div class="flex">
		<div class="grow">
			
		</div>
	</div>
</main>
