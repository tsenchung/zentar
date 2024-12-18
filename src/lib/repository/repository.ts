import { HighlightModeSchema } from '$lib/theory/fretboard';
import { z } from 'zod';

export interface Repository<T> {
	collection: () => Promise<T[]>;
	find: (id: number) => Promise<T | undefined>;
	create: (item: Omit<T, 'id'>) => Promise<void>;
	update: (item: T) => Promise<void>;
	delete: (id: number) => Promise<void>;
}

export const PracticeRoutineSchema = z.object({
	id: z.number(),
	name: z.string().min(1, { message: 'Please enter a name for the practice routine' })
});

export type PracticeRoutine = z.infer<typeof PracticeRoutineSchema>;

export const AidTextSchema = z.object({ type: z.literal('AidText'), text: z.string() });
export const AidVisualizerSchema = z.object({
	type: z.literal('AidVisualizer'),
	highlightMode: HighlightModeSchema
});
export const AidTabNotationSchema = z.object({
	type: z.literal('AidTabNotation'),
	tex: z.string()
});

export const ExerciseSchema = z.object({
	id: z.number(),
	title: z.string().min(1, { message: 'Please enter a title for the exercise.' }),
	aid: z.discriminatedUnion('type', [AidTextSchema, AidVisualizerSchema, AidTabNotationSchema])
});

export type Exercise = z.infer<typeof ExerciseSchema>;

export const PracticeRoutineExerciseSchema = z.object({
	id: z.number(),
	practiceRoutineId: z.number(),
	exerciseId: z.number(),
	duration: z.number(),
	order: z.number()
});

export type PracticeRoutineExercise = z.infer<typeof PracticeRoutineExerciseSchema>;
