<script lang="ts">
	import { majorScale } from '$lib/theory/majorScale';
	import { minorScale } from '$lib/theory/minorScale';
	import { ToneClass } from '$lib/theory/tones';
	import CircleOfFifths from '$lib/components/CircleOfFifths.svelte';
	import ArrowRight from '$lib/icons/ArrowRight.svelte';
	import List from '$lib/components/List.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import GuitarVisualization from '$lib/components/GuitarVisualization.svelte';
	import { highlighter } from '$lib/theory/fretboard';
	import type { ToneGroupBuilder } from '$lib/theory';
	import { majorScaleHarmonizationTriads, majorTriad } from '$lib/theory/triad';
	import { majorScaleHarmonizationSevenths, majorSeventh } from '$lib/theory/seventhChords';

	import { fretboardSettings } from '$lib/settings';

	interface HighlightModeScale {
		type: 'Scale';
		scaleName: string;
		builder: ToneGroupBuilder;
		tonic: ToneClass;
	}

	interface HighlightModeChord {
		type: 'Chord';
		chordType: string;
		builder: ToneGroupBuilder;
		scaleBuilder: ToneGroupBuilder;
		tonic: ToneClass;
		chordNumber: number;
	}

	type HighlightMode = Readonly<HighlightModeScale> | Readonly<HighlightModeChord>;

	let highlightMode: HighlightMode;
	$: highlighters = [buildHighlighter(highlightMode)];

	function buildHighlighter(highlightMode: HighlightMode) {
		if (highlightMode.type == 'Scale') {
			return highlighter(highlightMode.builder)(highlightMode.tonic);
		} else {
			return highlighter(highlightMode.builder)(
				highlightMode.scaleBuilder(highlightMode.tonic)[highlightMode.chordNumber].tone
			);
		}
	}

	function selectTonic(selectedTonic: ToneClass) {
		highlightMode = { ...highlightMode, tonic: selectedTonic };
	}

	const setHighlightModeScale = (builder: ToneGroupBuilder, scaleName: string) => () => {
		if (highlightMode.type == 'Scale') {
			highlightMode = { ...highlightMode, builder, scaleName };
		} else {
			highlightMode = { type: 'Scale', builder, scaleName, tonic: highlightMode.tonic };
		}
	};

	const setHighlightModeChord =
		(
			scaleBuilder: ToneGroupBuilder,
			builder: ToneGroupBuilder,
			chordType: string,
			chordNumber: number
		) =>
		() => {
			if (highlightMode.type == 'Chord') {
				highlightMode = { ...highlightMode, builder, chordType, chordNumber };
				highlightMode = highlightMode;
			} else {
				const tonic = highlightMode.tonic;
				highlightMode = { type: 'Chord', builder, chordType, tonic, scaleBuilder, chordNumber };
			}
		};

	const setDefaultHighlightMode = () => {
		highlightMode = {
			type: 'Scale',
			scaleName: 'MajorScale',
			tonic: ToneClass.C,
			builder: majorScale
		};
	};
	setDefaultHighlightMode();
</script>

<svelte:head>
	<title>Visualize</title>
</svelte:head>
<main>
	<div class="breadcrumbs text-sm">
		<ul>
			<li>Visualize</li>
		</ul>
	</div>
	<div class="flex items-center justify-between h-8 mb-4">
		<h1 class="text-xl">Visualize</h1>
	</div>
	<section class="overflow-scroll">
		<GuitarVisualization
			strings={$fretboardSettings.strings}
			{highlighters}
			options={$fretboardSettings}
		/>
	</section>
	<div class="divider mt-0"></div>
	<section class="flex">
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
					onSelect={setHighlightModeScale(majorScale, 'MajorScale')}
					active={highlightMode.type == 'Scale' && highlightMode.scaleName == 'MajorScale'}
				/>
				<ListItem
					label="Minor Scale"
					onSelect={setHighlightModeScale(minorScale, 'MinorScale')}
					active={highlightMode.type == 'Scale' && highlightMode.scaleName == 'MinorScale'}
				/>
				<ListItem
					label="Major Pentatonic Scale"
					onSelect={setHighlightModeScale(minorScale, 'MinorScale')}
					active={false}
				/>
				<ListItem
					label="Minor Pentatonic Scale"
					onSelect={setHighlightModeScale(minorScale, 'MinorScale')}
					active={false}
				/>
				<ListItem
					label="Major Scale Harmonization"
					onSelect={setHighlightModeChord(majorScale, majorTriad, 'Triad', 0)}
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
						onSelect={setHighlightModeChord(majorScale, majorTriad, 'Triad', 0)}
						active={highlightMode.type == 'Chord' && highlightMode.chordType == 'Triad'}
					/>
					<ListItem
						label="Seventh"
						onSelect={setHighlightModeChord(majorScale, majorSeventh, 'Seventh', 0)}
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
						onSelect={setHighlightModeChord(majorScale, triad.builder, highlightMode.chordType, i)}
						active={highlightMode.chordNumber == i}
					/>
				{/each}
			</List>
		{/if}
	</section>
</main>
