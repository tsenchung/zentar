<script lang="ts">
	export let onConfirm: () => void;
	export let id: string;
</script>

<dialog id={id} class="modal">
	<div class="modal-box">
		<div class="flex items-center mb-4">
			<h3 class="text-lg font-bold flex-grow"><slot name="title" /></h3>
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
