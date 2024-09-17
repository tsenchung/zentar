<script lang="ts">
	import { renderTone, ToneClass } from '$lib/theory/tones';
	import AnnularSector from './AnnularSector.svelte';

	export let a1: number;
	export let a2: number;

	export let r1: number;
	export let r2: number;
	export let tone: ToneClass;
	export let onTonicSelected: (tone: ToneClass) => void;
	export let tabindex: number;
	export let active: boolean;
</script>

<AnnularSector {a1} {a2} {r1} {r2} {active} onclick={() => onTonicSelected(tone)} {tabindex} />
<text
	style="pointer-events: none"
	dominant-baseline="central"
	class="text-xl"
	text-anchor="middle"
	x={((r1 + r2) / 2) * Math.cos((a2 + a1) / 2)}
	y={((r1 + r2) / 2) * Math.sin((a2 + a1) / 2)}
	fill="black"
	color="black">{renderTone(tone)}</text
>
