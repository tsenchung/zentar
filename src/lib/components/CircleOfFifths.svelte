<script lang="ts">
	import { ToneClass } from '$lib/theory/tones';
	import CircleofFifthsElement from './CircleofFifthsElement.svelte';

	export let initialTonic: ToneClass;
	export let onTonicSelected: (tonic: ToneClass) => void;

	const arcs = [
		[9, ToneClass.C],
		[10, ToneClass.G],
		[11, ToneClass.D],
		[0, ToneClass.A],
		[1, ToneClass.E],
		[2, ToneClass.B],
		[3, ToneClass.Gf],
		[4, ToneClass.Df],
		[5, ToneClass.Af],
		[6, ToneClass.Ef],
		[7, ToneClass.Bf],
		[8, ToneClass.F]
	].map((pair) => ({
		a1: pair[0] * (Math.PI / 6) - Math.PI / 12,
		a2: (pair[0] + 1) * (Math.PI / 6) - Math.PI / 12,
		tone: pair[1]
	}));

	let selectedTonic: ToneClass = initialTonic;
	function selectTonic(tonic: ToneClass) {
		selectedTonic = tonic;
		onTonicSelected(selectedTonic);
	}
</script>

<svg width="300" height="300">
	<style>
		.arc:hover {
			stroke-width: 2;
		}
	</style>

	<g transform="translate(150,150)">
		{#each arcs as arc, i}
			<CircleofFifthsElement
				r1={85}
				r2={145}
				a1={arc.a1}
				a2={arc.a2}
				tone={arc.tone}
				onTonicSelected={selectTonic}
				tabindex={0}
				active={selectedTonic === arc.tone}
			/>
		{/each}
	</g>
</svg>
