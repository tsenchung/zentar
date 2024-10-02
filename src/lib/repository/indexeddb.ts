import { openDB, type DBSchema, type IDBPDatabase, type StoreKey, type StoreNames, type StoreValue } from 'idb';
import type { Exercise, PracticeRoutine, PracticeRoutineExercise, Repository } from './repository';

declare module "idb" {
	type IDBPDatabaseExtends = Omit<IDBDatabase, 'createObjectStore' | 'deleteObjectStore' | 'transaction' | 'objectStoreNames'>;
	interface IDBPDatabase<DBTypes extends DBSchema | unknown = unknown> extends IDBPDatabaseExtends {
		add<Name extends StoreNames<DBTypes>>(storeName: Name, value: Omit<StoreValue<DBTypes, Name>, 'id'>, key?: StoreKey<DBTypes, Name> | IDBKeyRange): Promise<StoreKey<DBTypes, Name>>;
	}
}

export interface ZentarDB extends DBSchema {
	exercises: {
		key: number;
		value: Exercise;
	};
	practice_routines: {
		key: number;
		value: PracticeRoutine;
	};
	practice_routine_exercises: {
		key: number;
		value: PracticeRoutineExercise;
		indexes: {
			byExerciseId: number;
			byPracticeRoutineId: number;
		};
	};
}

export async function IndexedDBClient(): Promise<IDBPDatabase<ZentarDB>> {
	return openDB<ZentarDB>('zentar', 2, {
		upgrade(database, oldVersion) {
			switch (oldVersion) {
				case 0:
					setupExerciseStore(database);
					setupPracticeRoutineStore(database);
				// eslint-disable-next-line no-fallthrough
				case 1:
					setupPracticeRoutineExerciseStore(database);
			}
		}
	});
}

export async function Repository<Name extends StoreNames<ZentarDB>>(
	db: IDBPDatabase<ZentarDB>,
	repository: Name
): Promise<Repository<StoreValue<ZentarDB, Name>>> {
	return {
		async collection() {
			return db.getAll(repository);
		},
		async find(id: number) {
			return db.get(repository, id);
		},
		async create(item: Omit<StoreValue<ZentarDB, Name>, 'id'>) {
			await db.add(repository, item);
		},
		async update(item: StoreValue<ZentarDB, Name>) {
			await db.put(repository, item);
		},
		async delete(id: number) {
			return db.delete(repository, id);
		}
	};
}

export const PracticeRoutineExerciseRepository = (db: IDBPDatabase<ZentarDB>) => {
	return {
		async getExercisesForPracticeRoutine(
			practiceRoutineId: number
		): Promise<[PracticeRoutineExercise, Exercise | undefined][]> {
			const practiceRoutineExercises = await db.getAllFromIndex(
				'practice_routine_exercises',
				'byPracticeRoutineId',
				practiceRoutineId
			);
			const result = await Promise.all(
				practiceRoutineExercises.map(
					async (
						practiceRoutineExercise
					): Promise<[PracticeRoutineExercise, Exercise | undefined]> => {
						const exercise = await db.get('exercises', practiceRoutineExercise.exerciseId);
						return [practiceRoutineExercise, exercise];
					}
				)
			);
			return result;
		},
		async addExerciseToPracticeRoutine(
			practiceRoutineId: number,
			exerciseId: number,
			duration: number
		) {
			const exercises = (
				await db.getAllFromIndex(
					'practice_routine_exercises',
					'byPracticeRoutineId',
					practiceRoutineId
				)
			).sort((a, b) => a.order - b.order);
			exercises.forEach((exercise, i) => {
				db.put('practice_routine_exercises', { ...exercise, order: i });
			});
			db.add('practice_routine_exercises', {
				practiceRoutineId,
				exerciseId,
				duration,
				order: exercises.length
			});
		}
	};
};

function setupExerciseStore(db: IDBPDatabase<ZentarDB>) {
	return db.createObjectStore('exercises', { keyPath: 'id', autoIncrement: true });
}

function setupPracticeRoutineStore(db: IDBPDatabase<ZentarDB>) {
	return db.createObjectStore('practice_routines', { keyPath: 'id', autoIncrement: true });
}

function setupPracticeRoutineExerciseStore(db: IDBPDatabase<ZentarDB>) {
	const store = db.createObjectStore<'practice_routine_exercises'>('practice_routine_exercises', {
		keyPath: 'id',
		autoIncrement: true
	});
	store.createIndex('byExerciseId', 'exerciseId');
	store.createIndex('byPracticeRoutineId', 'practiceRoutineId');
	return store;
}
