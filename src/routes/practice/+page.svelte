<script lang="ts">
	import { fretboardSettings } from '$lib/settings';
	import GuitarVisualization from '$lib/components/GuitarVisualization.svelte';
	import { highlighter } from '$lib/theory/fretboard';
	import { majorScale } from '$lib/theory/majorScale';
	import { ToneClass } from '$lib/theory/tones';
	import Metronome from '$lib/components/metronome/Metronome.svelte';

	let duration = 65000;
	let timerEnd: number;
	let timer = 0;
	let currentTimeout: number;
	const tick = () => {
		timer = timerEnd - new Date().valueOf();
		if (timer > 0) {
			currentTimeout = setTimeout(tick, 100);
		}
	};

	const start = () => {
		timerEnd = new Date().valueOf() + duration;
		timer = duration;
		tick();
	};

	const pause = () => {
		clearTimeout(currentTimeout);
		duration = timerEnd - new Date().valueOf();
	};

	const resume = () => {
		start();
	};

	$: seconds = Math.trunc(timer / 1000) % 60;
	$: minutes = Math.trunc(timer / 60000) % 60;
	start();
</script>

<main>
	<h1>Practice</h1>
	<div class="g grid">
		<div class="timer">
			<div
				class="radial-progress"
				style="--value:{(100 * (duration - timer)) / duration}; --size:12rem; --thickness: 2px;"
				role="progressbar"
			>
				<span class="countdown font-mono text-2xl">
					<span style="--value:{minutes};"></span>
					:
					<span style="--value:{seconds};"></span>
				</span>
			</div>
		</div>
		<div class="metronome w-10/12 h-56"><Metronome /></div>
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
