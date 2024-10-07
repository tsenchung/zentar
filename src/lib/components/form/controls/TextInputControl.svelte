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
	import type { HTMLInputAttributes } from 'svelte/elements';
	interface $$Props extends Omit<HTMLInputAttributes, 'name'> {
		errorElementId: string;
		name: allKeys<Input>;
	}

	export let errorElementId: string;
	export let name: allKeys<Input>;

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

	$: errorMessage = $formState ? error($formState, name) : undefined;
	$: hasError = !!errorMessage;
	$: propName = typeof name === 'string' ? name : name.toString();
</script>

<label class="form-control w-full">
	<div class="label">
		<slot />
	</div>
	<input
		name={propName}
		aria-invalid={hasError}
		aria-errormessage={hasError ? errorElementId : ''}
		class="input input-bordered w-full aria-[invalid=true]:input-error"
		{...$$restProps}
	/>
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
