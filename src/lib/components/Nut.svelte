<script lang="ts">
	import type { DisplayParameters } from '$lib';

	export let parameters: DisplayParameters;
	export let stringCount: number;
</script>

<rect
	x={parameters.head.width - parameters.nut.width}
	y={parameters.marginTop - 1}
	width="4"
	height={(stringCount - 1) * parameters.stringSpacing + 2}
	fill="black"
/>
