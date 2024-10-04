import { error } from '@sveltejs/kit';
import { Repository, ExerciseRepository } from '../practice_routine';
import { IndexedDBClient, PracticeRoutineExerciseRepository } from '$lib/repository/indexeddb';

export const ssr = false;
export const prerender = false;

export async function load({ params }) {
	const client = await IndexedDBClient();
	const repository = await Repository(client);
	const practiceRoutineExerciseRepository = await PracticeRoutineExerciseRepository(client);
	const practiceRoutine = await repository.find(parseInt(params.id));
	const exerciseRepository = await ExerciseRepository(client);
	const allExercises = await exerciseRepository.collection();
	if (practiceRoutine && practiceRoutine.id) {
		const exercises = await practiceRoutineExerciseRepository.getExercisesForPracticeRoutine(
			practiceRoutine.id
		);
		return {
			practiceRoutine,
			repository,
			exercises,
			allExercises,
			practiceRoutineExerciseRepository,
			exerciseRepository,
			client
		};
	}
	error(404, 'Not found');
}
