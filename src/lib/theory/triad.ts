import type { ToneGroupBuilder } from '.';
import { add } from './tones';

const majorTriadSteps = [0, 4, 7];

export const majorTriad: ToneGroupBuilder = (tonic) =>
	majorTriadSteps.map((steps) => ({ tone: add(tonic, steps), interval: steps }));

const minorTriadSteps = [0, 3, 7];

export const minorTriad: ToneGroupBuilder = (tonic) =>
	minorTriadSteps.map((steps) => ({ tone: add(tonic, steps), interval: steps }));

const diminishedTriadSteps = [0, 3, 6];

export const diminishedTriad: ToneGroupBuilder = (tonic) =>
	diminishedTriadSteps.map((steps) => ({ tone: add(tonic, steps), interval: steps }));

export const majorScaleHarmonizationTriads = [
	{ name: 'I', builder: majorTriad },
	{ name: 'ii', builder: minorTriad },
	{ name: 'iii', builder: minorTriad },
	{ name: 'IV', builder: majorTriad },
	{ name: 'V', builder: majorTriad },
	{ name: 'vi', builder: minorTriad },
	{ name: 'vii°', builder: diminishedTriad }
];
