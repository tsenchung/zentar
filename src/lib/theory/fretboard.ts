import type { ToneGroupBuilder } from '.';
import { chromaticScale } from './chromaticScale';
import type { ToneClass } from './tones';

interface Highlight {
	interval: number;
}

export interface Note {
	tone: ToneClass;
	highlights: ReadonlyArray<Readonly<Highlight>>;
}

export interface Fretboard {
	notes: ReadonlyArray<ReadonlyArray<Readonly<Note>>>;
	strings: ReadonlyArray<ToneClass>;
	frets: number;
}
type Highlighter = (note: Note) => Note;

const createNote = (tone: ToneClass): Note => ({
	tone,
	highlights: []
});

const highlight = (note: Note, highlighters: ReadonlyArray<Highlighter>) =>
	highlighters.reduce((acc, highlighter) => highlighter(acc), note);

export const highlighter = (toneGroupBuilder: ToneGroupBuilder) => (baseTone: ToneClass) => {
	const map: Map<ToneClass, Readonly<Highlight>> = new Map(
		toneGroupBuilder(baseTone).map((relativeTone) => [
			relativeTone.tone,
			{ interval: relativeTone.interval }
		])
	);
	return (note: Note): Note => {
		const highlight = map.get(note.tone);
		return {
			...note,
			highlights: highlight ? note.highlights.concat(highlight) : note.highlights
		};
	};
};

export const buildFretboard = (
	strings: ReadonlyArray<ToneClass>,
	frets: number,
	highlighters: ReadonlyArray<Highlighter>
): Fretboard => ({
	notes: strings.map((string) =>
		chromaticScale(string, frets + 1).map((tone) => highlight(createNote(tone), highlighters))
	),
	strings,
	frets
});
