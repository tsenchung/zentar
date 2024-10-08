<script lang="ts">
	import { z } from 'zod';
	import {
		type PracticeRoutine,
		type Repository,
		PracticeRoutineSchema
	} from '$lib/repository/repository';
	import Form from '$lib/components/form/Form.svelte';
	import TextInputControl from '$lib/components/form/controls/TextInputControl.svelte';

	export let onCreate: () => void;
	export let repository: Repository<PracticeRoutine>;

	const CreatePracticeRoutineSchema = PracticeRoutineSchema.omit({ id: true });

	async function submit(formData: z.infer<typeof CreatePracticeRoutineSchema>) {
		await repository.create(formData);
		onCreate();
	}
</script>

<Form method="dialog" schema={CreatePracticeRoutineSchema} onSubmit={submit}>
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
