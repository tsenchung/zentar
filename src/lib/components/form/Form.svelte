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
	import { setContext } from 'svelte';

	import type { HTMLFormAttributes } from 'svelte/elements';
	interface $$Props extends HTMLFormAttributes {
		formState: Writable<
			| {
					validationResult: z.SafeParseReturnType<Input, Output>;
					dirty: { [P in allKeys<Input>]?: boolean | undefined };
					submitted: boolean;
			  }
			| undefined
		>;

		error: (
			formState: {
				validationResult: z.SafeParseReturnType<Input, Output>;
				dirty: { [P in allKeys<Input>]?: boolean | undefined };
				submitted: boolean;
			},
			name: allKeys<Input>
		) => string | undefined;

		FormAction: (form: HTMLFormElement) => void;
	}

	export let formState: Writable<
		| {
				validationResult: z.SafeParseReturnType<Input, Output>;
				dirty: { [P in allKeys<Input>]?: boolean | undefined };
				submitted: boolean;
		  }
		| undefined
	>;

	export let error: (
		formState: {
			validationResult: z.SafeParseReturnType<Input, Output>;
			dirty: { [P in allKeys<Input>]?: boolean | undefined };
			submitted: boolean;
		},
		name: allKeys<Input>
	) => string | undefined;

	export let FormAction: (form: HTMLFormElement) => void;

	setContext('formState', formState);
	setContext('error', error);
</script>

<form {...$$restProps} use:FormAction>
	<div class="flex flex-col gap-4">
		<slot />
	</div>
</form>
