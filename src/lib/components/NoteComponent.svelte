<script lang="ts">
	import type { DisplayParameters } from '$lib';
	import type { Note } from '$lib/theory/fretboard';
	import { renderTone } from '$lib/theory/tones';

	export let note: Note;
	export let colors: ReadonlyArray<string>;
	export let x: number;
	export let y: number;
	export let options: DisplayParameters;
</script>

<g transform="translate({x},{y})">
	<circle
		cx="-1"
		cy="-1"
		r={options.note.radius}
		fill={note.highlights.length > 0 ? colors[note.highlights[0].interval] : 'white'}
		stroke="black"
		stroke-width="2"
	/>
	<text dominant-baseline="central" text-anchor="middle">{renderTone(note.tone)} </text>
</g>
