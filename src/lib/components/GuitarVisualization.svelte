<script lang="ts">
	import type { DisplayParameters } from '$lib';
	import { buildFretboard, buildHighlighter, highlighter, type HighlightMode, type Note } from '$lib/theory/fretboard';
	import { ToneClass } from '$lib/theory/tones';
	import Fret from './Fret.svelte';
	import Fretboard from './Fretboard.svelte';
	import FretMarker from './FretMarker.svelte';
	import NoteComponent from './NoteComponent.svelte';
	import Nut from './Nut.svelte';

	export let highlightMode: HighlightMode;
	let highlighters: ReadonlyArray<(note: Note) => Note>;
	export let options: DisplayParameters;

	$: highlighters = [buildHighlighter(highlightMode)];



	function marker(fret: number, type: 'single' | 'double') {
		return { fret, type };
	}

	const colors = [
		'#99dbff',
		'#92d2ff',
		'#91c9ff',
		'#95beff',
		'#9db3ff',
		'#a7adff',
		'#b3a7ff',
		'#c0a0ff',
		'#cb9fff',
		'#d79dff',
		'#e29bff',
		'#ee99ff'
	];

	$: fretboard = buildFretboard(options.strings, options.frets, highlighters);

	$: fretMarkers = [
		marker(3, 'single'),
		marker(5, 'single'),
		marker(7, 'single'),
		marker(9, 'single'),
		marker(12, 'double'),
		marker(15, 'single'),
		marker(17, 'single'),
		marker(19, 'single'),
		marker(21, 'single'),
		marker(24, 'double')
	].filter((marker) => marker.fret <= options.frets);
</script>

<svg
	width={options.head.width + options.frets * options.fret.spacing + 40}
	height={30 + options.marginTop + options.strings.length * options.stringSpacing}
	class="bg-base-100"
>
	<g class="layer-base">
		<Nut parameters={options} stringCount={options.strings.length} />
		<Fretboard parameters={options}>
			{#each Array(options.frets) as _, i}
				<Fret parameters={options} number={i} stringCount={options.strings.length} />
			{/each}
			{#each options.strings as _, j}
				<line
					x1={0}
					y1={j * options.stringSpacing}
					x2={options.frets * options.fret.spacing}
					y2={j * options.stringSpacing}
					stroke-width="1"
					stroke="#999"
				/>
			{/each}
			<g
				transform="translate(0,{(options.strings.length - 1) * options.stringSpacing +
					options.note.radius +
					2.5 +
					15})"
			>
				{#each fretMarkers as { type, fret }}
					<FretMarker parameters={options} {type} {fret} />
				{/each}
			</g>
		</Fretboard>
	</g>
	<g class="layer-notes">
		<Fretboard parameters={options}>
			{#each fretboard.notes as stringNotes, j}
				{#each stringNotes as note, i}
					<NoteComponent
						{options}
						x={i * options.fret.spacing - options.fret.spacing / 2}
						y={j * options.stringSpacing}
						{note}
						{colors}
					/>
				{/each}
			{/each}
		</Fretboard>
	</g>
</svg>

<style>
	svg {
		cursor: default;
	}
</style>
