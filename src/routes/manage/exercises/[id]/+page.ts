import { error } from '@sveltejs/kit';
import { Repository } from '../exercises';
import { IndexedDBClient } from '$lib/repository/indexeddb';

export const ssr = false;
export const prerender = false;

export async function load({ params }) {
	const client = await IndexedDBClient();
	const repository = await Repository(client);
	const exercise = await repository.find(parseInt(params.id));
	if (exercise) {
		return {
			exercise,
			repository,
			client
		};
	}
	error(404, 'Not found');
}
