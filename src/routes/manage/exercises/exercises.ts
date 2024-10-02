import { Repository as RepositoryFactory, type ZentarDB } from '$lib/repository/indexeddb';
import type { Exercise } from '$lib/repository/repository';
import type { IDBPDatabase } from 'idb';

export const TextAidExercise = (): Exercise => ({
	title: '',
	aid: {
		type: 'TextAid',
		text: ''
	}
});

export const Repository = (db: IDBPDatabase<ZentarDB>) => RepositoryFactory(db, 'exercises');
