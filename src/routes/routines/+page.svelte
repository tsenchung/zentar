<script lang="ts">
	import ConfirmationDialog from '$lib/components/ConfirmationDialog.svelte';

	import type { PracticeRoutine } from '$lib/repository/repository';
	import { onDestroy } from 'svelte';
	import CreatePracticeRoutineForm from './CreatePracticeRoutineForm.svelte';
	import Trash from '$lib/icons/Trash.svelte';
	import XMark from '$lib/icons/XMark.svelte';
	import Play from '$lib/icons/Play.svelte';
	import Pencil from '$lib/icons/Pencil.svelte';

	export let data;

	let practiceRoutineToDelete: PracticeRoutine | undefined;

	function showCreateExerciseModal() {
		(<HTMLDialogElement>document.getElementById('practice_routine_create'))?.showModal();
	}

	function showDeletePracticeRoutineDialog(practiceRoutine: PracticeRoutine) {
		return () => {
			practiceRoutineToDelete = practiceRoutine;
			(<HTMLDialogElement>document.getElementById('practice_routine_delete'))?.showModal();
		};
	}

	async function refresh() {
		data.collection = await data.repository.collection();
	}

	function deletePracticeRoutine(practiceRoutineToDelete: PracticeRoutine | undefined) {
		return async () => {
			if (practiceRoutineToDelete && practiceRoutineToDelete.id) {
				data.repository.delete(practiceRoutineToDelete.id);
				await refresh();
			}
		};
	}

	onDestroy(() => {
		data.client.close();
	});
</script>

<main>
	<div class="flex">
		<div class="grow">
			<h1 class="text-2xl">Routines</h1>
		</div>
		<div>
			<button class="btn btn-primary" on:click={showCreateExerciseModal}>New</button>
		</div>
	</div>
	<table class="table">
		<thead>
			<tr>
				<td>Name</td>
				<td class="w-60">Actions</td>
			</tr>
		</thead>
		<tbody>
			{#each data.collection as practiceRoutine (practiceRoutine.id)}
				<tr>
					<td>{practiceRoutine.name}</td>
					<td>
						<div class="flex gap-2">
							<a class="btn btn-circle" href="routines/{practiceRoutine.id}/practice">
								<Play size="size-6" />
							</a>
							<a class="btn btn-circle" href="routines/{practiceRoutine.id}">
								<Pencil />
							</a>
							<button
								class="btn btn-circle"
								on:click={showDeletePracticeRoutineDialog(practiceRoutine)}
							>
								<Trash />
							</button>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<dialog id="practice_routine_create" class="modal">
		<div class="modal-box w-96">
			<div class="flex items-center mb-4">
				<h3 class="text-lg font-bold flex-grow">New Practice Routine</h3>
				<form method="dialog">
					<button class="btn btn-circle">
						<XMark />
					</button>
				</form>
			</div>
			<div>
				<CreatePracticeRoutineForm onCreate={refresh} repository={data.repository} />
			</div>
		</div>
	</dialog>

	<ConfirmationDialog
		id="practice_routine_delete"
		onConfirm={deletePracticeRoutine(practiceRoutineToDelete)}
	>
		<span slot="title">Delete practice routine?</span>
		<span slot="message">Are you sure?</span>
		<span slot="confirmation_button">Delete</span>
	</ConfirmationDialog>
</main>
