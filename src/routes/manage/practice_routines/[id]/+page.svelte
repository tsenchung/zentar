<script lang="ts">
	import { formatDuration } from '$lib/time';
	import { onDestroy } from 'svelte';

	export let data;

	function showAddExercise() {
		(<HTMLDialogElement>document.getElementById('practice_routine_add_exercise')).showModal();
	}

	let selectedExercise: string | number;

	async function addExercise(ev: SubmitEvent) {
		if (data.practiceRoutine.id) {
			data.practiceRoutineExerciseRepository.addExerciseToPracticeRoutine(
				data.practiceRoutine.id,
				3,
				300
			);
			data.exercises = await data.practiceRoutineExerciseRepository.getExercisesForPracticeRoutine(
				data.practiceRoutine.id
			);
		}
	}

	onDestroy(() => {
		data.client.close();
	});
</script>

<main>
	<div class="flex justify-between">
		<div>
			<h1 class="text-2xl">{data.practiceRoutine.name}</h1>
		</div>
		<div>
			<button class="btn btn-primary" on:click={showAddExercise}>Add Exercise</button>
		</div>
	</div>
	<table class="table">
		<thead>
			<tr>
				<th> Exercise </th>
				<th> Duration </th>
			</tr>
		</thead>
		<tbody>
			{#each data.exercises as exercise}
				<tr>
					<td>{exercise[1]?.title}</td>
					<td>{formatDuration(exercise[0].duration)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>

<dialog id="practice_routine_add_exercise" class="modal">
	<div class="modal-box w-96">
		<div class="flex items-center mb-4">
			<h3 class="text-lg font-bold flex-grow">Add Exercise</h3>
			<form method="dialog">
				<button class="btn btn-circle"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>
				</button>
			</form>
		</div>
		<div>
			<form id="practice_routine_add_exercise_form" method="dialog" on:submit={addExercise}>
				<div class="flex flex-col gap-4">
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text font-semibold">Exercise</span>
						</div>
						<select
							form="practice_routine_add_exercise_form"
							class="select w-full"
							required
							bind:value={selectedExercise}
						>
							<option disabled selected value="">Select an exercise</option>
							{#each data.allExercises as exercise}
								<option value={exercise.id}>
									{exercise.title}
								</option>
							{/each}
						</select>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text font-semibold">Duration</span>
							<span class="label-text-alt text-neutral">MM:SS</span>
						</div>
						<input
							type="text"
							name="duration"
							class="input input-bordered w-full aria-[invalid=true]:input-error"
						/>
					</label>
					<div>
						<button class="btn btn-primary">Add</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</dialog>
