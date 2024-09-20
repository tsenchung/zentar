import { writable, type Writable } from 'svelte/store';

import type { DisplayParameters } from '$lib';
import { ToneClass } from './theory/tones';

export const fretboardSettings: Writable<DisplayParameters> = writable({
	marginTop: 40,
	stringSpacing: 50,
	head: {
		width: 80,
		paddingLeft: 40
	},
	nut: {
		width: 4
	},
	note: {
		radius: 20
	},
	fret: {
		spacing: 60,
		width: 2
	},
	frets: 21,
	strings: [ToneClass.G, ToneClass.D, ToneClass.A, ToneClass.E]
});
