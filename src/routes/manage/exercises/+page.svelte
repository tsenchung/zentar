<script lang="ts">
	import ConfirmationDialog from '$lib/components/ConfirmationDialog.svelte';
	import type { Exercise } from '$lib/repository/repository';
	import { onDestroy } from 'svelte';
	import { TextAidExercise } from './exercises';

	export let data;

	let newExercise: Exercise = TextAidExercise();
	let exerciseToDelete: Exercise | undefined;

	function showCreateExerciseModal() {
		(<HTMLDialogElement>document.getElementById('exercise_create'))?.showModal();
	}

	function showDeleteExerciseDialog(exercise: Exercise) {
		return () => {
			exerciseToDelete = exercise;
			(<HTMLDialogElement>document.getElementById('exercise_delete'))?.showModal();
		};
	}
	async function refresh() {
		data.collection = await data.repository.collection();
	}

	async function createExercise() {
		await data.repository.save(newExercise);
		await refresh();
		newExercise = TextAidExercise();
	}

	function deleteExercise(exerciseToDelete: Exercise | undefined) {
		return async () => {
			if (exerciseToDelete && exerciseToDelete.id) {
				await data.repository.delete(exerciseToDelete.id);
				await refresh();
			}
		};
	}

	onDestroy(() => {
		data.client.close();
	});
</script>

<main>
	<div class="overflow-x-auto">
		<div class="flex">
			<div class="grow">
				<h1 class="text-2xl">Exercises</h1>
			</div>
			<div>
				<button class="btn btn-primary" on:click={showCreateExerciseModal}>New</button>
			</div>
		</div>
		<p>Exercises created can be added to your practice routines.</p>
		<table class="table">
			<thead>
				<tr>
					<td> Name </td>
					<td> Actions </td>
				</tr>
			</thead>
			<tbody>
				{#each data.collection as exercise (exercise.id)}
					<tr>
						<td>{exercise.title}</td>
						<td>
							<div>
								<a class="btn btn-circle" href="exercises/{exercise.id}">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
										/>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
										/>
									</svg>
								</a>
								<button class="btn btn-circle" on:click={showDeleteExerciseDialog(exercise)}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
										/>
									</svg>
								</button>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<dialog id="exercise_create" class="modal">
		<div class="modal-box w-10/12 max-w-full">
			<div class="flex items-center mb-4">
				<h3 class="text-lg font-bold flex-grow">New Exercise</h3>
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

			<form method="dialog" on:submit={createExercise}>
				<div class="flex flex-col gap-4 w-full mb-4">
					<input
						type="text"
						placeholder="Title"
						required
						bind:value={newExercise.title}
						class="input input-bordered w-full"
					/>
					<textarea
						class="textarea textarea-bordered font-mono w-full"
						placeholder="Exercise"
						bind:value={newExercise.aid.text}
					></textarea>
				</div>
				<button class="btn btn-primary">Create</button>
			</form>
		</div>
	</dialog>

	<ConfirmationDialog id="exercise_delete" onConfirm={deleteExercise(exerciseToDelete)}>
		<span slot="title">Delete exercise?</span>
		<span slot="message">Are you sure?</span>
		<span slot="confirmation_button">Delete</span>
	</ConfirmationDialog>
</main>
