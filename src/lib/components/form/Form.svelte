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

	import { FormFactory } from '$lib/form';

	interface $$Props extends HTMLFormAttributes {
		schema: z.ZodObject<T, UnknownKeys, Catchall, Output, Input>;
		onSubmit: (formData: Output) => Promise<void>;
	}

	export let schema: z.ZodObject<T, UnknownKeys, Catchall, Output, Input>;
	export let onSubmit: (formData: Output) => Promise<void>;

	const { formState, error, FormAction } = FormFactory(schema, onSubmit);

	setContext('formState', formState);
	setContext('error', error);
</script>

<form {...$$restProps} use:FormAction>
	<div class="flex flex-col gap-4">
		<slot />
	</div>
</form>
