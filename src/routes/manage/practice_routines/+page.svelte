<script lang="ts">
	import ConfirmationDialog from '$lib/components/ConfirmationDialog.svelte';
	
	import type {PracticeRoutine} from '$lib/repository/repository';
	import CreatePracticeRoutineForm from './CreatePracticeRoutineForm.svelte';

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

</script>

<main>
	<div class="overflow-x-auto">
		<div class="flex">
			<div class="grow">
				<h1 class="text-2xl">Practice Routines</h1>
			</div>
			<div>
				<button class="btn btn-primary" on:click={showCreateExerciseModal}>New</button>
			</div>
		</div>
		<p>Practice routines created here will appear in the practice page.</p>
		<table class="table">
			<thead>
				<tr>
					<td> Name </td>
					<td> Actions </td>
				</tr>
			</thead>
			<tbody>
				{#each data.collection as practiceRoutine (practiceRoutine.id)}
					<tr>
						<td>{practiceRoutine.name}</td>
						<td>
							<div>
								<a class="btn btn-circle" href="practice_routines/{practiceRoutine.id}">
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
								<button class="btn btn-circle" on:click={showDeletePracticeRoutineDialog(practiceRoutine)}>
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

	<dialog id="practice_routine_create" class="modal">
		<div class="modal-box w-96">
			<div class="flex items-center mb-4">
				<h3 class="text-lg font-bold flex-grow">New Practice Routine</h3>
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
				<CreatePracticeRoutineForm onCreate={refresh} repository={data.repository} />
			</div>
		</div>
	</dialog>

	<ConfirmationDialog id="practice_routine_delete" onConfirm={deletePracticeRoutine(practiceRoutineToDelete)}>
		<span slot="title">Delete practice routine?</span>
		<span slot="message">Are you sure?</span>
		<span slot="confirmation_button">Delete</span>
	</ConfirmationDialog>
</main>
