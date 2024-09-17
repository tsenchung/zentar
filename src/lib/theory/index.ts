import { ToneClass } from './tones';

export interface RelativeTone {
	tone: ToneClass;
	interval: number;
}

export type ToneGroupBuilder = (tonic: ToneClass) => ReadonlyArray<Readonly<RelativeTone>>;
