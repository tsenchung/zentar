export enum ToneClass {
	A,
	Bf,
	B,
	C,
	Df,
	D,
	Ef,
	E,
	F,
	Gf,
	G,
	Af
}

const orderedTones = [
	ToneClass.A,
	ToneClass.Bf,
	ToneClass.B,
	ToneClass.C,
	ToneClass.Df,
	ToneClass.D,
	ToneClass.Ef,
	ToneClass.E,
	ToneClass.F,
	ToneClass.Gf,
	ToneClass.G,
	ToneClass.Af
];

const toneToIndex = new Map([
	[ToneClass.A, 0],
	[ToneClass.Bf, 1],
	[ToneClass.B, 2],
	[ToneClass.C, 3],
	[ToneClass.Df, 4],
	[ToneClass.D, 5],
	[ToneClass.Ef, 6],
	[ToneClass.E, 7],
	[ToneClass.F, 8],
	[ToneClass.Gf, 9],
	[ToneClass.G, 10],
	[ToneClass.Af, 11]
]);

const toneToString = new Map([
	[ToneClass.A, 'A'], // A
	[ToneClass.Bf, 'B♭'],
	[ToneClass.B, 'B'],
	[ToneClass.C, 'C'],
	[ToneClass.Df, 'D♭'],
	[ToneClass.D, 'D'],
	[ToneClass.Ef, 'E♭'],
	[ToneClass.E, 'E'],
	[ToneClass.F, 'F'],
	[ToneClass.Gf, 'G♭'],
	[ToneClass.G, 'G'],
	[ToneClass.Af, 'A♭']
]);

export function add(tone: ToneClass, halfSteps: number) {
	const index = toneToIndex.get(tone) || ToneClass.A;
	return orderedTones[(index + halfSteps) % 12];
}

export function renderTone(tone: ToneClass): string {
	return toneToString.get(tone) || 'A';
}
