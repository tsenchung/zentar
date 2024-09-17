import type { ToneGroupBuilder } from '.';
import { add } from './tones';

const majorSeventhSteps = [0, 4, 7, 11];

export const majorSeventh: ToneGroupBuilder = (tonic) =>
	majorSeventhSteps.map((steps) => ({ tone: add(tonic, steps), interval: steps }));

const dominantSeventhSteps = [0, 4, 7, 10];

export const dominantSeventh: ToneGroupBuilder = (tonic) =>
	dominantSeventhSteps.map((steps) => ({ tone: add(tonic, steps), interval: steps }));

const minorSeventhSteps = [0, 3, 7, 10];

export const minorSeventh: ToneGroupBuilder = (tonic) =>
	minorSeventhSteps.map((steps) => ({ tone: add(tonic, steps), interval: steps }));

const minorSeventhFlat5Steps = [0, 3, 6, 10];

export const minorSeventhFlat5: ToneGroupBuilder = (tonic) =>
	minorSeventhFlat5Steps.map((steps) => ({ tone: add(tonic, steps), interval: steps }));

export const majorScaleHarmonizationSevenths = [
	{ name: 'I', builder: majorSeventh },
	{ name: 'ii', builder: minorSeventh },
	{ name: 'iii', builder: minorSeventh },
	{ name: 'IV', builder: majorSeventh },
	{ name: 'V', builder: dominantSeventh },
	{ name: 'vi', builder: minorSeventh },
	{ name: 'vii', builder: minorSeventhFlat5 }
];
