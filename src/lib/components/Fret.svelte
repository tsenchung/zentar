<script lang="ts">
	import type { DisplayParameters } from '$lib';

	export let parameters: DisplayParameters;
	export let number: number;
	export let stringCount: number;
</script>

<g transform="translate({number * parameters.fret.spacing},0)">
	<rect
		x={parameters.fret.spacing - parameters.fret.width}
		width={parameters.fret.width}
		height={(stringCount - 1) * parameters.stringSpacing}
	/>
</g>
