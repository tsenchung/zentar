<script lang="ts">
	import ConfirmationDialog from '$lib/components/ConfirmationDialog.svelte';
	import Header from '$lib/components/Header.svelte';
	import Form from '$lib/components/form/Form.svelte';
	import SelectControl from '$lib/components/form/controls/SelectControl.svelte';
	import TextInputControl from '$lib/components/form/controls/TextInputControl.svelte';
	import IconPlus from '$lib/icons/IconPlus.svelte';
	import Play from '$lib/icons/Play.svelte';
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

	async function addExerciseToPracticeRoutine(formData: z.infer<typeof AddExerciseFormSchema>) {
		await data.practiceRoutineExerciseRepository.addExerciseToPracticeRoutine(
			data.practiceRoutine.id,
			formData.exerciseId,
			formData.duration
		);
		data.exercises = await data.practiceRoutineExerciseRepository.getExercisesForPracticeRoutine(
			data.practiceRoutine.id
		);
	}

	function showAddExercise() {
		(<HTMLDialogElement>document.getElementById('practice_routine_add_exercise')).showModal();
	}

	onDestroy(() => {
		data.client.close();
	});
</script>

<svelte:head>
	<title>Edit {data.practiceRoutine.name}</title>
</svelte:head>
<main>
	<Header>
		<ul slot="breadcrumbs">
			<li><a href="/routines">Routines</a></li>
			<li>{data.practiceRoutine.name}</li>
		</ul>
		<svelte:fragment slot="title">{data.practiceRoutine.name}</svelte:fragment>
		<svelte:fragment slot="actions">
			<button class="btn" on:click={showAddExercise}><IconPlus />Add Exercise</button>
			<a
				class="btn btn-primary"
				href="{data.practiceRoutine.id}/practice"
				aria-label="Practice {data.practiceRoutine.name}"><Play size="size-6" /></a
			>
		</svelte:fragment>
	</Header>
	<table class="table table-zebra">
		<thead>
			<tr>
				<th>Exercise</th>
				<th class="w-48">Duration</th>
				<th class="w-48">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each data.exercises as [practiceRoutineExercise, exercise]}
				<tr>
					<td><span class="text-lg">{exercise?.title}</span></td>
					<td><span class="text-lg">{formatDuration(practiceRoutineExercise.duration)}</span></td>
					<td>
						<button
							class="btn btn-circle btn-outline btn-error"
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
				schema={AddExerciseFormSchema}
				onSubmit={addExerciseToPracticeRoutine}
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
