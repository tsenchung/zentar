<script lang="ts">
	import XMark from '$lib/icons/XMark.svelte';

	export let onConfirm: () => void;
	export let id: string;
</script>

<dialog {id} class="modal">
	<div class="modal-box">
		<div class="flex items-center mb-4">
			<h3 class="text-lg font-bold flex-grow"><slot name="title" /></h3>
			<form method="dialog">
				<button class="btn btn-circle"><XMark /> </button>
			</form>
		</div>
		<p>
			<slot name="message" />
		</p>
		<div class="modal-action">
			<form method="dialog" on:submit={onConfirm}>
				<button class="btn btn-error text-white"><slot name="confirmation_button" /></button>
			</form>
		</div>
	</div>
</dialog>
