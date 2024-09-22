import { LocalStorageRepository } from "$lib/repository";

export interface Exercise {
	id: string;
	title: string;
	aid: Aid;
}

interface TextAid {
	type: "text";
	text: string;
}

export type Aid = TextAid;

export const TextAidExercise = (): Exercise => ({
	id: crypto.randomUUID(),
	title: "",
	aid: {
		type: "text",
		text: ""
	}
});

export const client = LocalStorageRepository<Exercise>('exercises_collection');
