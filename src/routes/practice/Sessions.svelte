<script lang="ts">
	import { client } from './practiceSession';

	let practiceSessions = client.getPracticeSessions();
	let newPracticeSessionName: string = '';

	function showCreatePracticeSessionModal() {
		(<HTMLDialogElement>document.getElementById('practice_session_create'))?.showModal();
	}

	function createPracticeSession() {
		client.add(newPracticeSessionName);
		newPracticeSessionName = '';
		practiceSessions = client.getPracticeSessions();
	}
</script>

<div class="overflow-x-auto">
	<h1 class="text-2xl">Sessions</h1>
	<button class="btn" on:click={showCreatePracticeSessionModal}>New</button>
	<table class="table">
		<thead>
			<tr>
				<td> Name </td>
				<td> Actions </td>
			</tr>
		</thead>
		<tbody>
			{#each practiceSessions as practiceSession (practiceSession.uuid)}
				<tr>
					<td>{practiceSession.name}</td>
					<td>
						<button class="btn btn-circle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="size-6"
							>
								<path
									fill-rule="evenodd"
									d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
<dialog id="practice_session_create" class="modal">
	<div class="modal-box">
		<h3 class="text-lg font-bold">Create Practice Session</h3>
		<form method="dialog" on:submit={createPracticeSession}>
			<!-- if there is a button in form, it will close the modal -->
			<input
				type="text"
				placeholder="Practice Session Name"
				required
				bind:value={newPracticeSessionName}
				class="input input-bordered w-full max-w-xs"
			/>
			<button class="btn">Close</button>
		</form>
	</div>
</dialog>
