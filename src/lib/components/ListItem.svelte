<script lang="ts">
	export let label: string;
	export let active: boolean;
	export let onSelect: () => void;
</script>

<li class="w-full bg-slate-500">
	<button
		on:click={onSelect}
		class="w-full text-s flex p-3 font-semibold border-y border-y-solid border-y-gray {active
			? 'bg-primary'
			: 'bg-base-100'} opacity-100 hover:opacity-75">{label}</button
	>
</li>
