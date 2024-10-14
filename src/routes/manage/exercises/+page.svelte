<script lang="ts">
	import ConfirmationDialog from '$lib/components/ConfirmationDialog.svelte';
	import { ExerciseSchema, type Exercise } from '$lib/repository/repository';
	import { onDestroy } from 'svelte';
	import Eye from '$lib/icons/Eye.svelte';
	import Trash from '$lib/icons/Trash.svelte';
	import XMark from '$lib/icons/XMark.svelte';
	import Form from '$lib/components/form/Form.svelte';
	import TextInputControl from '$lib/components/form/controls/TextInputControl.svelte';
	import { z } from 'zod';
	import IconPlus from '$lib/icons/IconPlus.svelte';
	import Header from '$lib/components/Header.svelte';
	import { orderedTones, renderTone, ToneClass } from '$lib/theory/tones';
	import { majorScaleHarmonizationTriads } from '$lib/theory/triad';
	import { majorScaleHarmonizationSevenths } from '$lib/theory/seventhChords';
	import HighlightPicker from '$lib/components/HighlightPicker.svelte';
	import type { HighlightMode } from '$lib/theory/fretboard';
	import GuitarVisualization from '$lib/components/GuitarVisualization.svelte';
	import { fretboardSettings } from '$lib/settings.js';

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

	const AddExerciseSchema = ExerciseSchema.omit({ id: true });

	async function addExercise(formData: z.infer<typeof AddExerciseSchema>) {
		await data.repository.create(formData);
		await refresh();
	}

	function deleteExercise(exerciseToDelete: Exercise | undefined) {
		return async () => {
			if (exerciseToDelete && exerciseToDelete.id) {
				await data.repository.delete(exerciseToDelete.id);
				await refresh();
			}
		};
	}

	function setHighlightMode(picked: HighlightMode) {
		highlightMode = picked
	}

	let aidType: string = 'AidText';

	let defaultHighlightMode: HighlightMode = {
		type: 'Scale',
		scale: 'Major',
		tonic: ToneClass.C
	};

	let highlightMode: HighlightMode;

	onDestroy(() => {
		data.client.close();
	});
</script>

<svelte:head>
	<title>Exercises</title>
</svelte:head>
<main>
	<Header>
		<ul slot="breadcrumbs">
			<li>Exercises</li>
		</ul>
		<svelte:fragment slot="title">Exercises</svelte:fragment>
		<svelte:fragment slot="actions">
			<button class="btn btn-primary" on:click={showCreateExerciseModal}
				><IconPlus /> Exercise</button
			>
		</svelte:fragment>
	</Header>
	<table class="table table-zebra">
		<thead>
			<tr>
				<td> Name </td>
				<td class="w-48"> Actions </td>
			</tr>
		</thead>
		<tbody>
			{#each data.collection as exercise (exercise.id)}
				<tr>
					<td><span class="text-lg">{exercise.title}</span></td>
					<td>
						<div class="flex gap-2">
							<a class="btn btn-circle btn-outline" href="exercises/{exercise.id}">
								<Eye />
							</a>
							<button
								class="btn btn-circle btn-outline btn-error"
								on:click={showDeleteExerciseDialog(exercise)}
							>
								<Trash />
							</button>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>

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
			<Form method="dialog" schema={AddExerciseSchema} onSubmit={addExercise}>
				<TextInputControl errorElementId="create_exercise_name_error" name="title">
					<span class="label-text font-semibold">Name</span>
				</TextInputControl>
				<fieldset class="form-control">
					<div class="label">
						<legend class="label-text font-semibold">Aid Type</legend>
					</div>
					<div class="join">
						<input
							class="join-item btn"
							type="radio"
							name="aid.type"
							value="AidText"
							aria-label="Text"
							bind:group={aidType}
						/>
						<input
							class="join-item btn"
							type="radio"
							name="aid.type"
							value="AidVisualizer"
							aria-label="Visualizer"
							bind:group={aidType}
						/>
					</div>
				</fieldset>
				{#if aidType == 'AidText'}
					<label class="form-control">
						<div class="label">
							<span class="label-text font-semibold">Text Aid</span>
						</div>
						<textarea class="textarea textarea-bordered font-mono w-full" name="aid.text" />
					</label>
				{:else if aidType == 'AidVisualizer'}
					<HighlightPicker onHighlightPicked={setHighlightMode}/>
					<input type="hidden" name="aid.highlightMode.type" value={highlightMode.type} />
					<input type="hidden" name="aid.highlightMode.scale" value={highlightMode.scale} />
					<input type="hidden" name="aid.highlightMode.tonic" value={highlightMode.tonic} />
					<input type="hidden" name="aid.highlightMode.scale" value={highlightMode.scale} />
					<input type="hidden" name="aid.highlightMode.scale" value={highlightMode.scale} />
					<input type="hidden" name="aid.highlightMode.scale" value={highlightMode.scale} />
					{#if highlightMode.type == 'Chord'}
						<input type="hidden" name="aid.highlightMode.chordType" value={highlightMode.chordType} />
						<input type="hidden" name="aid.highlightMode.chordNumber" value={highlightMode.chordNumber} />
						<input type="hidden" name="aid.highlightMode.scale" value={highlightMode.scale} />
					{/if}
					<section class="overflow-scroll">
						<GuitarVisualization
							highlightMode={highlightMode || defaultHighlightMode}
							options={$fretboardSettings}
						/>
					</section>
				{/if}
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
