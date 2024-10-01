import { openDB, type DBSchema, type IDBPDatabase, type StoreNames, type StoreValue } from 'idb';
import type { Exercise, PracticeRoutine, PracticeRoutineExercise, Repository } from './repository';

interface ZentarDB extends DBSchema {
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
	},
}

export async function connect<Name extends StoreNames<ZentarDB>>(repository: Name):  Promise<Repository<StoreValue<ZentarDB, Name>>> {
	const db = await openDB<ZentarDB>('zentar', 2, {
		upgrade(database, oldVersion) {
			console.log(oldVersion);
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
	return {
		async collection() {
			return db.getAll(repository);
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		async byIndex(index: string, key: any): Promise<StoreValue<ZentarDB, Name>[]> {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return db.getAllFromIndex(repository, index as any, key);
		},
		async find(id: number) {
			return db.get(repository, id);
		},
		async save(item: StoreValue<ZentarDB, Name>) {
			await db.put(repository, item);
		},
		async delete(id: number) {
			return db.delete(repository, id);
		}
	}
}

function setupExerciseStore(db: IDBPDatabase<ZentarDB>) {
	return db.createObjectStore('exercises', { keyPath: 'id', autoIncrement: true });
}

function setupPracticeRoutineStore(db: IDBPDatabase<ZentarDB>) {
	return db.createObjectStore('practice_routines', { keyPath: 'id', autoIncrement: true });
}

function setupPracticeRoutineExerciseStore(db: IDBPDatabase<ZentarDB>) {
	const store = db.createObjectStore<'practice_routine_exercises'>('practice_routine_exercises', { keyPath: 'id', autoIncrement: true });
	store.createIndex('byExerciseId', 'exerciseId');
	store.createIndex('byPracticeRoutineId', 'practiceRoutineId');
	return store;
}
