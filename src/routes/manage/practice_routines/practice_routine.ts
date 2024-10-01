import { connect } from '$lib/repository/indexeddb';
import type {
	Exercise,
	PracticeRoutineExercise,
	Repository as IRepository
} from '$lib/repository/repository';

export const Repository = () => connect('practice_routines');

export const PracticeRoutineExerciseRepository = () => connect('practice_routine_exercises');

export const ExerciseRepository = () => connect('exercises');

type Tuple = [PracticeRoutineExercise, Exercise | undefined];

export async function getExercisesForPracticeRoutine(
	practiceRoutineId: number,
	practiceRoutineExerciseRepository: IRepository<PracticeRoutineExercise>,
	exerciseRepository: IRepository<Exercise>
): Promise<Tuple[]> {
	const practiceRoutineExercises = await practiceRoutineExerciseRepository.byIndex(
		'byPracticeRoutineId',
		practiceRoutineId
	);
	const result = await Promise.all(
		practiceRoutineExercises.map(async (practiceRoutineExercise): Promise<Tuple> => {
			const exercise = await exerciseRepository.find(practiceRoutineExercise.exerciseId);
			return [practiceRoutineExercise, exercise];
		})
	);
	return result;
}
