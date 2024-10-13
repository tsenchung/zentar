import { z } from 'zod';
import { writable } from 'svelte/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type allKeys<T> = T extends any ? keyof T : never;

function toObject(formData: FormData): unknown {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const obj: any = {};
	for (const [key, value] of formData.entries()) {
		let nested = obj;
		key.split('.').forEach((keyPathElement, i, keyPath) => {
			if (keyPath.length == i + 1) {
				nested[keyPathElement] = value;
			} else {
				if (nested[keyPathElement] === undefined) {
					nested[keyPathElement] = {};
				}
				nested = nested[keyPathElement];
			}
		});
	}
	return obj;
}

export function FormFactory<
	T extends z.ZodRawShape,
	UnknownKeys extends z.UnknownKeysParam = z.UnknownKeysParam,
	Catchall extends z.ZodTypeAny = z.ZodTypeAny,
	Output = z.objectOutputType<T, Catchall, UnknownKeys>,
	Input = z.objectInputType<T, Catchall, UnknownKeys>
>(
	schema: z.ZodObject<T, UnknownKeys, Catchall, Output, Input>,
	onSubmit: (data: Output) => Promise<void>
) {
	const formStateStore = writable<
		| {
				validationResult: z.SafeParseReturnType<Input, Output>;
				dirty: { [P in allKeys<Input>]?: boolean | undefined };
				submitted: boolean;
		  }
		| undefined
	>();
	return {
		formState: formStateStore,
		FormAction(form: HTMLFormElement) {
			const validate = () => {
				toObject(new FormData(form));
				return schema.safeParse(toObject(new FormData(form)));
			};
			let formState = {
				validationResult: validate(),
				dirty: {},
				submitted: false
			};
			formStateStore.set(formState);

			const validateAndSetDirty = (input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => () => {
				const dirty: { [key: string]: boolean } = { ...formState.dirty };
				dirty[input.name] = true;
				formState = {
					...formState,
					validationResult: validate(),
					dirty
				};
				formStateStore.set(formState);
			};

			form.addEventListener('blur', (ev) => {
				console.log("onblur")
				if (ev.target instanceof HTMLInputElement || ev.target instanceof HTMLTextAreaElement) {
					validateAndSetDirty(ev.target)();
				}
			}, true);
			form.onchange = (ev) => {
				if (ev.target instanceof HTMLSelectElement) {
					validateAndSetDirty(ev.target)();
				}
			}

			form.onclick = (ev) => {
				if (
					ev.target &&
					ev.target instanceof HTMLInputElement &&
					ev.target.type == 'radio' &&
					ev.target &&
					ev.target
				) {
					validateAndSetDirty(ev.target)();
				}
			};
			form.onsubmit = (ev: SubmitEvent) => {
				formState = {
					...formState,
					submitted: true,
					validationResult: validate()
				};
				if (formState.validationResult.success) {
					onSubmit(formState.validationResult.data);
					form.querySelectorAll('input').forEach((input) => {
						input.value = '';
					});
					form.querySelectorAll('select').forEach((select) => {
						select.value = '';
					});
					form.querySelectorAll('textarea').forEach((textArea) => {
						textArea.value = '';
					});
					formState = {
						...formState,
						submitted: false,
						dirty: {},
						validationResult: validate()
					};
					formStateStore.set(formState);
				} else {
					formStateStore.set(formState);
					ev.preventDefault();
				}
			};
		},
		error(
			formState:
				| {
						validationResult: z.SafeParseReturnType<Input, Output>;
						dirty: { [P in allKeys<Input>]?: boolean | undefined };
						submitted: boolean;
				  }
				| undefined,
			propField: allKeys<Input>
		): string | undefined {
			if (!formState) {
				return;
			}
			const { dirty, submitted, validationResult } = formState;
			if ((dirty[propField] || submitted) && !validationResult.success) {
				const propFieldErrors = validationResult.error.formErrors.fieldErrors[propField];
				if (propFieldErrors && propFieldErrors.length > 0) {
					return propFieldErrors[0];
				} else {
					return;
				}
			} else {
				return;
			}
		}
	};
}
