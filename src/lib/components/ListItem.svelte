<script lang="ts">
	export let label: string;
	export let active: boolean;
	export let onSelect: () => void;
</script>

<li class="w-full">
	<button
		type="button"
		on:click={onSelect}
		class="btn w-full text-s flex p-3 font-semibold rounded-none {active ? 'btn-primary' : ''}"
		>{label}</button
	>
</li>
