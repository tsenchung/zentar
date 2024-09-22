import { error } from '@sveltejs/kit';
import { client } from "../../exercises";

export const ssr = false;

export function load({ params }) {
	const exercise = client.find(params.id);
    if(exercise) {
        return {
            exercise
        };
    }
	error(404, 'Not found');
}