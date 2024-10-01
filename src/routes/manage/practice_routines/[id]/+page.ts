import { error } from '@sveltejs/kit';
import { Repository, PracticeRoutineExerciseRepository, getExercisesForPracticeRoutine, ExerciseRepository } from '../practice_routine';

export const ssr = false;

export async function load({ params }) {
	const repository = await Repository();
	const practiceRoutineExerciseRepository = await PracticeRoutineExerciseRepository();
	const practiceRoutine = await repository.find(parseInt(params.id));
	const exerciseRepository = await ExerciseRepository();
	const allExercises = await exerciseRepository.collection();
	if (practiceRoutine && practiceRoutine.id) {
		const exercises = await getExercisesForPracticeRoutine(
			practiceRoutine.id,
			practiceRoutineExerciseRepository,
			exerciseRepository,
		);
		return {
			practiceRoutine,
			repository,
			exercises,
			allExercises,
			practiceRoutineExerciseRepository,
			exerciseRepository
		};
	}
	error(404, 'Not found');
}
