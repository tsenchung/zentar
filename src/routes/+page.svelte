<script lang="ts">
	import * as alphaTab from '@coderline/alphatab';
	import { ToneClass } from '$lib/theory/tones';
	import GuitarVisualization from '$lib/components/GuitarVisualization.svelte';
	import { type HighlightMode } from '$lib/theory/fretboard';
	import { fretboardSettings } from '$lib/settings';
	import HighlightPicker from '$lib/components/HighlightPicker.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import MusicNotation from '$lib/components/MusicNotation.svelte';
	

	let highlightMode: HighlightMode | undefined;
	let defaultHighlightMode: HighlightMode = {
		type: 'Scale',
		scale: 'Major',
		tonic: ToneClass.C
	};
	function setHighlightMode(highlightModeToSet: HighlightMode) {
		highlightMode = highlightModeToSet;
	}
	let tex: string = '';
</script>

<svelte:head>
	<title>Visualize</title>
</svelte:head>
<main>
	<div class="breadcrumbs text-sm">
		<ul>
			<li>Visualize</li>
		</ul>
	</div>
	<div class="flex items-center justify-between h-8 mb-4">
		<h1 class="text-xl">Visualize</h1>
	</div>
	<section class="overflow-scroll">
		<GuitarVisualization
			highlightMode={highlightMode || defaultHighlightMode}
			options={$fretboardSettings}
		/>
	</section>
	<div class="divider mt-0"></div>
	<HighlightPicker onHighlightPicked={setHighlightMode} />
</main>
<textarea class="textarea textarea-bordered w-full p-4" rows="10" bind:value={tex} />
<MusicNotation tex={tex} />

<style>
	  textarea {
		width: 100%;
	  }
</style>