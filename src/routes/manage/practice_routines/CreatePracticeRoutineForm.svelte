<script lang="ts">
	import { z, type SafeParseReturnType } from 'zod';
	import {
		type PracticeRoutine,
		type Repository,
		PracticeRoutineSchema
	} from '$lib/repository/repository';

	export let onCreate: () => void;
	export let repository: Repository<PracticeRoutine>;

	let validation: SafeParseReturnType<{}, PracticeRoutine> | undefined;
	let validationErrors = new z.ZodError<PracticeRoutine>([]);
	let errors: z.typeToFlattenedError<PracticeRoutine>;
	$: {
		if (validation?.error) {
			validationErrors = validation.error;
		} else {
			validationErrors = new z.ZodError<PracticeRoutine>([]);
		}
	}
	$: errors = validationErrors.flatten();
	let form: HTMLFormElement;

	function Form(node: HTMLFormElement) {
		form = node;
	}

	function validate() {
		const data = new FormData(form);
		validation = PracticeRoutineSchema.safeParse(Object.fromEntries(data.entries()));
	}

	async function submit(ev: SubmitEvent) {
		if (validation?.success) {
			await repository.save(validation.data);
			onCreate();
		} else {
			ev.preventDefault();
		}
	}

	function ZenForm(node: HTMLFormElement) {
		node.addEventListener('submit', () => {});
	}

	function hasError(key: keyof PracticeRoutine, errors: z.typeToFlattenedError<PracticeRoutine>) {
		return !!(errors && errors.fieldErrors[key] && errors.fieldErrors[key].length > 0);
	}
</script>

<form method="dialog" use:Form on:submit={submit} use:ZenForm novalidate>
	<div class="flex flex-col gap-4 w-full mb-4">
		<label class="form-control w-full">
			<div class="label">
				<span class="label-text">Name<span class="text-error">*</span></span>
			</div>
			<input
				type="text"
				name="name"
				class="input input-bordered w-full aria-[invalid=true]:input-error"
				aria-invalid={hasError('name', errors)}
				aria-errormessage={hasError('name', errors) ? 'create_practice_routine_name_error' : ''}
				on:blur={validate}
			/>
			<span id="create_practice_routine_name_error" class="error-message text-error"
				>{errors.fieldErrors.name?.at(0) || ''}</span
			>
		</label>
	</div>
	<div class="flex justify-end">
		<button class="btn btn-primary">Create</button>
	</div>
</form>

<style>
	.error-message {
		visibility: hidden;
	}

	[aria-invalid='true'] ~ .error-message {
		visibility: visible;
	}
</style>
