import { error } from '@sveltejs/kit';
import { Repository } from '../../practice_routine';
import { IndexedDBClient, PracticeRoutineExerciseRepository } from '$lib/repository/indexeddb';

export const ssr = false;
export const prerender = false;

export async function load({ params }) {
	const client = await IndexedDBClient();
	const repository = await Repository(client);
	const practiceRoutineExerciseRepository = await PracticeRoutineExerciseRepository(client);
	const practiceRoutine = await repository.find(parseInt(params.id));
	if (practiceRoutine && practiceRoutine.id) {
		const exercises = await practiceRoutineExerciseRepository.getExercisesForPracticeRoutine(
			practiceRoutine.id
		);
		client.close();
		return {
			practiceRoutine,
			exercises
		};
	}
	error(404, 'Not found');
}
