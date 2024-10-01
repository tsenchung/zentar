import { Repository } from "./exercises";

export const ssr = false;

export async function load() {
	const repository = await Repository();
	return {
		collection: await repository.collection(),
		repository
	};
}