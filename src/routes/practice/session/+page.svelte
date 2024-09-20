<script lang="ts">
	import { fretboardSettings } from '$lib/settings';
	import GuitarVisualization from '$lib/components/GuitarVisualization.svelte';
	import { highlighter } from '$lib/theory/fretboard';
	import { majorScale } from '$lib/theory/majorScale';
	import { ToneClass } from '$lib/theory/tones';
	import Timer from '$lib/components/Timer.svelte';
</script>

<main>
	<h1>Practice</h1>
	<div class="g grid">
		<div class="timer">
			<Timer />
		</div>
		<div class="metronome w-10/12 h-56 bg-slate-100">Metronome</div>
		<div class="exercise">
			<section class="overflow-scroll">
				<GuitarVisualization
					strings={$fretboardSettings.strings}
					highlighters={[highlighter(majorScale)(ToneClass.C)]}
					options={$fretboardSettings}
				/>
			</section>
		</div>
	</div>
</main>

<style>
	.g {
		grid-template-columns: 1fr 1fr;
		grid-template-areas:
			't m'
			'p p';
	}
	.timer {
		grid-area: t;
		align-self: center;
		justify-self: center;
	}
	.metronome {
		grid-area: m;
	}
	.exercise {
		grid-area: p;
		justify-self: center;
	}
</style>
