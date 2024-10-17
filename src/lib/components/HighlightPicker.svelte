<script lang="ts">
	import ArrowRight from '$lib/icons/ArrowRight.svelte';
	import type { ChordType, HighlightMode, Scale } from '$lib/theory/fretboard';
	import { majorScaleHarmonizationSevenths } from '$lib/theory/seventhChords';
	import { ToneClass } from '$lib/theory/tones';
	import { majorScaleHarmonizationTriads } from '$lib/theory/triad';

	import CircleOfFifths from './CircleOfFifths.svelte';
	import List from './List.svelte';
	import ListItem from './ListItem.svelte';

	export let onHighlightPicked: (highlightMode: HighlightMode) => void;
	let highlightMode: HighlightMode = {
		type: 'Scale',
		scale: 'Major',
		tonic: ToneClass.C
	};
	$: {
		onHighlightPicked(highlightMode);
	}

	function selectTonic(selectedTonic: ToneClass) {
		highlightMode = { ...highlightMode, tonic: selectedTonic };
	}

	const setHighlightModeScale = (scale: Scale) => () => {
		if (highlightMode.type == 'Scale') {
			highlightMode = { ...highlightMode, scale };
		} else {
			highlightMode = { type: 'Scale', scale, tonic: highlightMode.tonic };
		}
	};

	const setHighlightModeChord = (chordType: ChordType, chordNumber: number) => () => {
		if (highlightMode.type == 'Chord') {
			highlightMode = { ...highlightMode, chordType, chordNumber };
			highlightMode = highlightMode;
		} else {
			const tonic = highlightMode.tonic;
			highlightMode = { type: 'Chord', scale: 'Major', chordType, tonic, chordNumber };
		}
	};
</script>

<section class="flex overflow-x-auto">
	<section class="mr-8">
		<CircleOfFifths onTonicSelected={selectTonic} initialTonic={highlightMode.tonic} />
	</section>
	<div class="self-center">
		<ArrowRight />
	</div>
	<section class="ml-8">
		<List classes="w-56 text-sm">
			<ListItem
				label="Major Scale"
				onSelect={setHighlightModeScale('Major')}
				active={highlightMode.type == 'Scale' && highlightMode.scale == 'Major'}
			/>
			<ListItem
				label="Minor Scale"
				onSelect={setHighlightModeScale('Minor')}
				active={highlightMode.type == 'Scale' && highlightMode.scale == 'Minor'}
			/>
			<ListItem
				label="Major Pentatonic Scale"
				onSelect={setHighlightModeScale('Minor')}
				active={false}
			/>
			<ListItem
				label="Minor Pentatonic Scale"
				onSelect={setHighlightModeScale('Minor')}
				active={false}
			/>
			<ListItem
				label="Major Scale Harmonization"
				onSelect={setHighlightModeChord('Triad', 0)}
				active={highlightMode.type == 'Chord'}
			/>
		</List>
	</section>
	{#if highlightMode.type == 'Chord'}
		<div class="self-center ml-8">
			<ArrowRight />
		</div>
		<section class="ml-8">
			<List classes="w-56 text-sm">
				<ListItem
					label="Triad"
					onSelect={setHighlightModeChord('Triad', 0)}
					active={highlightMode.type == 'Chord' && highlightMode.chordType == 'Triad'}
				/>
				<ListItem
					label="Seventh"
					onSelect={setHighlightModeChord('Seventh', 0)}
					active={highlightMode.type == 'Chord' && highlightMode.chordType == 'Seventh'}
				/>
			</List>
		</section>
		<div class="self-center ml-8">
			<ArrowRight />
		</div>
		<List classes="w-56 text-sm ml-8">
			{#each highlightMode.chordType == 'Triad' ? majorScaleHarmonizationTriads : majorScaleHarmonizationSevenths as triad, i}
				<ListItem
					label={triad.name}
					onSelect={setHighlightModeChord(highlightMode.chordType, i)}
					active={highlightMode.chordNumber == i}
				/>
			{/each}
		</List>
	{/if}
</section>
