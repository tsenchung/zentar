import type { ToneClass } from './theory/tones';

// place files you want to import through the `$lib` alias in this folder.
export interface DisplayParameters {
	marginTop: number;
	stringSpacing: number;
	head: {
		width: number;
		paddingLeft: number;
	};
	nut: {
		width: number;
	};
	note: {
		radius: number;
	};
	fret: {
		width: number;
		spacing: number;
	};
	frets: number;
	strings: ToneClass[];
}
