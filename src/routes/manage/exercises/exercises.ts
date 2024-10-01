import { connect } from "$lib/repository/indexeddb";
import type { Exercise } from "$lib/repository/repository";

export const TextAidExercise = (): Exercise => ({
	title: "",
	aid: {
		type: "TextAid",
		text: ""
	}
});

export const Repository = () => connect('exercises');
