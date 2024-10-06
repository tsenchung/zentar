import { IndexedDBClient } from '$lib/repository/indexeddb';
import { Repository } from './practice_routine';

export const ssr = false;

export async function load() {
	const client = await IndexedDBClient();
	const repository = await Repository(client);
	const collection = await repository.collection();
	return {
		collection,
		repository,
		client
	};
}
