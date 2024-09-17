<script lang="ts">
	import type { DisplayParameters } from '$lib';

	export let type: 'single' | 'double';
	export let parameters: DisplayParameters;
	export let fret: number;
</script>

<g>
	<circle
		cx={(fret - 1) * parameters.fret.spacing + parameters.fret.spacing / 2}
		fill="black"
		r={5}
	/>
	{#if type === 'double'}
		<circle
			cx={(fret - 1) * parameters.fret.spacing + parameters.fret.spacing / 2}
			fill="black"
			r={5}
			cy={15}
		/>
	{/if}
</g>
