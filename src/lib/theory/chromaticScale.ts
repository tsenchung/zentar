import { ToneClass, add } from './tones';

export function chromaticScale(tonic: ToneClass, halfSteps: number) {
	const scale: ToneClass[] = [];
	for (let i = 0; i < halfSteps; i++) {
		scale.push(add(tonic, i));
	}
	return scale;
}
