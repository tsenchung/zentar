<script lang="ts">
	import ConfirmationDialog from '$lib/components/ConfirmationDialog.svelte';
	import Form from '$lib/components/form/Form.svelte';
	import SelectControl from '$lib/components/form/controls/SelectControl.svelte';
	import TextInputControl from '$lib/components/form/controls/TextInputControl.svelte';
	import { FormFactory } from '$lib/form.js';
	import Trash from '$lib/icons/Trash.svelte';
	import XMark from '$lib/icons/XMark.svelte';
	import { formatDuration } from '$lib/time';
	import { onDestroy } from 'svelte';
	import { z } from 'zod';

	export let data;
	let practiceRoutineExerciseToRemoveId: number;

	const showRemoveExerciseDialog = (practiceRoutineExerciseId: number) => () => {
		practiceRoutineExerciseToRemoveId = practiceRoutineExerciseId;
		(<HTMLDialogElement>document.getElementById('practice_routine_exercise_remove')).showModal();
	};

	const removeExerciseFromPracticeRoutine = async () => {
		await data.practiceRoutineExerciseRepository.removeExerciseFromPracticeRoutine(
			practiceRoutineExerciseToRemoveId
		);
		data.exercises = await data.practiceRoutineExerciseRepository.getExercisesForPracticeRoutine(
			data.practiceRoutine.id
		);
	};

	const AddExerciseFormSchema = z.object({
		exerciseId: z.coerce
			.number({ message: 'Please select an exercise' })
			.min(1, { message: 'Please select an exercise' }),
		duration: z
			.string()
			.regex(/^\d+:[0-5][0-9]$/, {
				message:
					'Please make sure the duration matches the mm:ss format. Examples: 00:59 (59 seconds), 1:00 (one minute), 10:30 (10 minutes, 30 seconds)'
			})
			.transform((s, ctx) => {
				const [minutes, seconds] = s.split(':').map((s) => parseInt(s, 10));
				const duration = minutes * 60 + seconds;
				if (duration === 0) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Please input a duration of at least one second'
					});
					return z.NEVER;
				} else {
					return duration;
				}
			})
	});

	const { formState, FormAction, error } = FormFactory(AddExerciseFormSchema, async (formData) => {
		await data.practiceRoutineExerciseRepository.addExerciseToPracticeRoutine(
			data.practiceRoutine.id,
			formData.exerciseId,
			formData.duration
		);
		data.exercises = await data.practiceRoutineExerciseRepository.getExercisesForPracticeRoutine(
			data.practiceRoutine.id
		);
	});

	function showAddExercise() {
		(<HTMLDialogElement>document.getElementById('practice_routine_add_exercise')).showModal();
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
				<th>Exercise</th>
				<th>Duration</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each data.exercises as [practiceRoutineExercise, exercise]}
				<tr>
					<td>{exercise?.title}</td>
					<td>{formatDuration(practiceRoutineExercise.duration)}</td>
					<td>
						<button
							class="btn btn-circle"
							on:click={showRemoveExerciseDialog(practiceRoutineExercise.id)}
						>
							<Trash />
						</button>
					</td>
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
				<button class="btn btn-circle">
					<XMark />
				</button>
			</form>
		</div>
		<div>
			<Form
				id="practice_routine_add_exercise_form"
				method="dialog"
				{FormAction}
				{formState}
				{error}
			>
				<SelectControl
					form="practice_routine_add_exercise_form"
					name="exerciseId"
					aria-required="true"
					errorElementId="add_practice_routine_exercise_exerciseId_error"
				>
					<span class="label-text font-semibold" slot="label">Exercise</span>
					<svelte:fragment slot="options">
						<option disabled selected value="">Select an exercise</option>
						{#each data.allExercises as exercise}
							<option value={exercise.id}>
								{exercise.title}
							</option>
						{/each}
					</svelte:fragment>
				</SelectControl>
				<TextInputControl
					type="text"
					aria-required="true"
					name="duration"
					errorElementId="add_practice_routine_exercise_duration_error"
				>
					<span class="label-text font-semibold">Duration</span>
					<span class="label-text-alt text-neutral">mm:ss</span>
				</TextInputControl>
				<div>
					<button class="btn btn-primary">Add</button>
				</div>
			</Form>
		</div>
	</div>
</dialog>

<ConfirmationDialog
	id="practice_routine_exercise_remove"
	onConfirm={removeExerciseFromPracticeRoutine}
>
	<span slot="title">Remove exercise?</span>
	<span slot="message">Are you sure?</span>
	<span slot="confirmation_button">Remove</span>
</ConfirmationDialog>
