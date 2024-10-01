import { Repository } from './practice_routine';

export const ssr = false;

export async function load() {
	const repository = await Repository();
	const collection = await repository.collection();
		return {
			collection,
			repository,
		};

}
