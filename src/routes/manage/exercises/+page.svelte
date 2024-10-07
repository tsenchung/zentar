<script lang="ts">
	import ConfirmationDialog from '$lib/components/ConfirmationDialog.svelte';
	import { ExerciseSchema, type Exercise } from '$lib/repository/repository';
	import { onDestroy } from 'svelte';
	import { TextAidExercise } from './exercises';
	import Eye from '$lib/icons/Eye.svelte';
	import Trash from '$lib/icons/Trash.svelte';
	import XMark from '$lib/icons/XMark.svelte';
	import { FormFactory } from '$lib/form';
	import Form from '$lib/components/form/Form.svelte';
	import TextInputControl from '$lib/components/form/controls/TextInputControl.svelte';

	export let data;

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
	const { formState, error, FormAction } = FormFactory(ExerciseSchema.omit({id: true}), async (formData) => {
		await data.repository.create(formData);
		await refresh();
	});

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
									<Eye />
								</a>
								<button class="btn btn-circle" on:click={showDeleteExerciseDialog(exercise)}>
									<Trash />
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
					<button class="btn btn-circle">
						<XMark />
					</button>
				</form>
			</div>
			<Form method="dialog" {formState} {error} {FormAction}>
				<TextInputControl errorElementId="create_exercise_name_error" name="title">
					<span class="label-text font-semibold">Name</span>
				</TextInputControl>
				<input hidden name="aid.type" value="TextAid"/>
				<textarea class="textarea textarea-bordered font-mono w-full" name="aid.text" />
				<div>
					<button class="btn btn-primary">Create</button>
				</div>
			</Form>
		</div>
	</dialog>

	<ConfirmationDialog id="exercise_delete" onConfirm={deleteExercise(exerciseToDelete)}>
		<span slot="title">Delete exercise?</span>
		<span slot="message">Are you sure?</span>
		<span slot="confirmation_button">Delete</span>
	</ConfirmationDialog>
</main>
