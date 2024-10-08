<script lang="ts" context="module">
	import { z } from 'zod';
	import { type Writable } from 'svelte/store';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	type allKeys<T> = T extends any ? keyof T : never;
</script>

<script
	lang="ts"
	generics="T extends z.ZodRawShape, UnknownKeys extends z.UnknownKeysParam = z.UnknownKeysParam, Catchall extends z.ZodTypeAny = z.ZodTypeAny, Output = z.objectOutputType<T, Catchall, UnknownKeys>, Input = z.objectInputType<T, Catchall, UnknownKeys>"
>
	import { getContext } from 'svelte';
	import type { HTMLSelectAttributes } from 'svelte/elements';

	interface $$Props extends Omit<HTMLSelectAttributes, 'name'> {
		errorElementId: string;
		name: allKeys<Input>;
	}
	export let errorElementId: string;
	let formState: Writable<
		| {
				validationResult: z.SafeParseReturnType<Input, Output>;
				dirty: { [P in allKeys<Input>]?: boolean | undefined };
				submitted: boolean;
		  }
		| undefined
	> = getContext('formState');
	let error: (
		formState: {
			validationResult: z.SafeParseReturnType<Input, Output>;
			dirty: { [P in allKeys<Input>]?: boolean | undefined };
			submitted: boolean;
		},
		name: allKeys<Input>
	) => string | undefined = getContext('error');
	export let name: allKeys<Input>;

	$: errorMessage = $formState ? error($formState, name) : undefined;
	$: hasError = !!errorMessage;
	$: propName = typeof name === 'string' ? name : name.toString();
</script>

<label class="form-control w-full">
	<div class="label">
		<slot name="label" />
	</div>
	<select
		class="select w-full"
		name={propName}
		aria-invalid={hasError}
		aria-errormessage={hasError ? errorElementId : ''}
		{...$$restProps}
	>
		<slot name="options" />
	</select>
	{#if hasError}
		<span id={errorElementId} class="error-message text-error mt-1">
			{errorMessage}
		</span>
	{/if}
</label>

<style>
	.error-message {
		visibility: hidden;
	}

	[aria-invalid='true'] ~ .error-message {
		visibility: visible;
	}
</style>
