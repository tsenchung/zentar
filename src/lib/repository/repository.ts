import { z } from "zod";

export interface Repository<T> {
	collection: () => Promise<T[]>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	byIndex: (index: string, key: any) => Promise<T[]>;
	find:  (id: number) => Promise<T | undefined>;
	save:  (item: T) => Promise<void>;
	delete: (id: number) => Promise<void>;
}

export const PracticeRoutineSchema = z.object({
	id: z.number().optional(),
	name: z.string().min(1, { message: "Please enter a name for the practice routine" })
});

export type PracticeRoutine = z.infer<typeof PracticeRoutineSchema>;

export const TextAidSchema = z.object({ type: z.literal('TextAid'), text: z.string()});

export const ExerciseSchema = z.object({
	id: z.number().optional(),
	title: z.string().min(1, { message: 'Please enter a title for the exercise.' }),
	aid: z.discriminatedUnion('type', [
		TextAidSchema
	])
});

export type Exercise = z.infer<typeof ExerciseSchema>;

export const PracticeRoutineExerciseSchema = z.object({
	id: z.number().optional(),
	practiceRoutineId: z.number(),
	exerciseId: z.number(),
	duration: z.number(),
	order: z.number()
});

export type PracticeRoutineExercise = z.infer<typeof PracticeRoutineExerciseSchema>;
