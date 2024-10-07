<script lang="ts">
	import { z, type SafeParseReturnType } from 'zod';
	import {
		type PracticeRoutine,
		type Repository,
		PracticeRoutineSchema
	} from '$lib/repository/repository';
	import Form from '$lib/components/form/Form.svelte';
	import { FormFactory } from '$lib/form';
	import TextInputControl from '$lib/components/form/controls/TextInputControl.svelte';

	export let onCreate: () => void;
	export let repository: Repository<PracticeRoutine>;

	const { formState, error, FormAction } = FormFactory(
		PracticeRoutineSchema.omit({ id: true }),
		async (formData) => {
			await repository.create(formData);
			onCreate();
		}
	);
</script>

<Form method="dialog" {formState} {error} {FormAction}>
	<TextInputControl
		type="text"
		aria-required="true"
		name="name"
		errorElementId="create_practice_routine_name_error"
	>
		<span class="label-text font-semibold">Name</span>
	</TextInputControl>
	<div>
		<button class="btn btn-primary">Create</button>
	</div>
</Form>
