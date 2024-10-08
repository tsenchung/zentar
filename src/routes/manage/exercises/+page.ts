import { IndexedDBClient } from '$lib/repository/indexeddb';
import { Repository } from './exercises';

export const ssr = false;

export async function load() {
	const client = await IndexedDBClient();
	const repository = await Repository(client);
	return {
		collection: await repository.collection(),
		repository,
		client
	};
}
