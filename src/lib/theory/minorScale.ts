import type { ToneGroupBuilder } from '.';
import { add } from './tones';

const minorScaleSteps = [0, 2, 3, 5, 7, 8, 10];

export const minorScale: ToneGroupBuilder = (tonic) =>
	minorScaleSteps.map((steps) => ({ tone: add(tonic, steps), interval: steps }));
