import type { ToneGroupBuilder } from '.';
import { add } from './tones';

const majorScaleSteps = [0, 2, 4, 5, 7, 9, 11];

export const majorScale: ToneGroupBuilder = (tonic) =>
	majorScaleSteps.map((steps) => ({ tone: add(tonic, steps), interval: steps }));
