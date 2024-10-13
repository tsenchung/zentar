import type { ToneGroupBuilder } from '.';
import { chromaticScale } from './chromaticScale';
import { majorScale } from './majorScale';
import { minorScale } from './minorScale';
import { majorScaleHarmonizationSevenths } from './seventhChords';
import { ToneClass } from './tones';
import { majorScaleHarmonizationTriads } from './triad';
import { z } from 'zod';

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

const ScaleSchema = z.enum(['Major', 'Minor']);
export type Scale = z.infer<typeof ScaleSchema>;

const ChordTypeSchema = z.enum(['Triad', 'Seventh']);
export type ChordType = z.infer<typeof ChordTypeSchema>;

const HighlightModeScaleSchema = z.object({
	type: z.literal('Scale'),
	scale: ScaleSchema,
	tonic: z.preprocess((v) => typeof v == 'string' ? parseInt(v, 10): v, z.nativeEnum(ToneClass))
});
export type HighlightModeScale = z.infer<typeof HighlightModeScaleSchema>

const HighlightModeChordSchema = z.object({
	type: z.literal('Chord'),
	scale: ScaleSchema,
	chordType: ChordTypeSchema,
	tonic: z.preprocess((v) => typeof v == 'string' ? parseInt(v, 10): v, z.nativeEnum(ToneClass)),
	chordNumber: z.coerce.number()
});

export type HighlightModeChord  = z.infer<typeof HighlightModeChordSchema>

export const HighlightModeSchema = z.discriminatedUnion('type', [
	HighlightModeScaleSchema,
	HighlightModeChordSchema
]);
export type HighlightMode = z.infer<typeof HighlightModeSchema>;

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

function throwNever(value: never) {
	throw new Error(`Unhandled case: ${value}`);
}

function toneGroupBuilderFor(scale: Scale): ToneGroupBuilder {
	switch (scale) {
		case "Major":
			return majorScale;
		case "Minor":
			return minorScale;
		default:
			throwNever(scale);
			return majorScale;
	}
}

export function buildHighlighter(highlightMode: HighlightMode) {
	if (highlightMode.type == 'Scale') {
		return highlighter(toneGroupBuilderFor(highlightMode.scale))(highlightMode.tonic);
	} else {
			const scale = toneGroupBuilderFor(highlightMode.scale)(highlightMode.tonic);
			const harmonization = highlightMode.chordType == "Triad" ? majorScaleHarmonizationTriads : majorScaleHarmonizationSevenths;
			return highlighter(harmonization[highlightMode.chordNumber].builder)(scale[highlightMode.chordNumber].tone);
	}
}

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
