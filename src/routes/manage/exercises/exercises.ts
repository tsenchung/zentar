import { Repository as RepositoryFactory, type ZentarDB } from '$lib/repository/indexeddb';
import type { IDBPDatabase } from 'idb';

export const Repository = (db: IDBPDatabase<ZentarDB>) => RepositoryFactory(db, 'exercises');
