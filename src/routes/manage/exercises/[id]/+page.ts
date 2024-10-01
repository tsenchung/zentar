import { error } from '@sveltejs/kit';
import { Repository } from "../exercises";

export const ssr = false;

export async function load({ params }) {
	const repository = await Repository();
	const exercise = await repository.find(parseInt(params.id));
    if(exercise) {
        return {
            exercise,
			repository
        };
    }
	error(404, 'Not found');
}