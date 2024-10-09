<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';
	import metronomeClickDownbeat from './250551__druminfected__metronomeup.wav';
	import metronomeClickNotOne from './250552__druminfected__metronome.wav';
	import SixteenthNote from '$lib/icons/SixteenthNote.svelte';
	import TripletNote from '$lib/icons/TripletNote.svelte';
	import EightNote from '$lib/icons/EightNote.svelte';
	import QuarterNote from '$lib/icons/QuarterNote.svelte';
	import Play from '$lib/icons/Play.svelte';
	import Pause from '$lib/icons/Pause.svelte';

	let audioCtx: AudioContext | undefined;
	let playing = false;
	if (browser) {
		audioCtx = new AudioContext();
	}
	let buffer: AudioBuffer | undefined;
	let buffer2: AudioBuffer | undefined;
	let scheduler: number | undefined;
	let nextAvailableSlot: number;
	let bpm = 60;

	let scheduled: AudioNode[] = [];
	let subdivisions: 1 | 2 | 3 | 4 = 4;

	async function fetchDowneatClick() {
		const response = await fetch(metronomeClickDownbeat);
		buffer = await audioCtx!.decodeAudioData(await response.arrayBuffer());
		const response2 = await fetch(metronomeClickNotOne);
		buffer2 = await audioCtx!.decodeAudioData(await response2.arrayBuffer());
	}

	function scheduleBeat(start: number) {
		const time = 60 / bpm / subdivisions;
		for (let i = 0; i < subdivisions; i++) {
			let soundBuffer = i == 0 ? buffer : buffer2;
			const source = audioCtx!.createBufferSource();
			source.buffer = soundBuffer!;
			source.connect(audioCtx!.destination);
			source.start(start + i * time);
			scheduled.push(source);
			source.addEventListener('ended', () => {
				scheduled.shift();
			});
		}
	}

	function togglePlay() {
		if (playing) {
			pause();
		} else {
			play();
		}
	}

	function pause() {
		clearInterval(scheduler);
		scheduled.forEach((node) => {
			node.disconnect();
		});
		playing = false;
	}

	function play() {
		playing = true;
		nextAvailableSlot = audioCtx!.currentTime + 0.01;
		schedule();
		scheduler = setInterval(schedule, 0.015);
	}

	function schedule() {
		if (nextAvailableSlot - audioCtx!.currentTime > 1) {
			return;
		}
		let start: number;
		start = nextAvailableSlot;
		nextAvailableSlot = nextAvailableSlot + 60 / bpm;
		scheduleBeat(start);
	}
	onMount(() => {
		fetchDowneatClick();
	});
	onDestroy(() => {
		if (browser) {
			audioCtx?.close();
		}
	});
</script>

<div class="flex text-2xl gap-4 mb-4">
	Metronome
<label class="swap text-primary font-bold">
	<input type="checkbox" on:click={togglePlay} autocomplete="off" />
	<div class="swap-on">
		ON
	</div>
	<div class="swap-off">
		OFF
	</div>
</label>
</div>
<div class="flex justify-between items-center mb-10">
	<div class="flex items-center gap-4">
		<div class="flex items-end gap-2">
			<span class="text-5xl font-mono">{bpm}</span><span class="text-3xl">BPM</span>
		</div>
	</div>
	<div class="flex gap-4">
		<div class="join">
			<button
				class="btn join-item {subdivisions == 1 ? 'btn-primary' : ''}"
				on:click={() => {
					subdivisions = 1;
				}}><QuarterNote /></button
			>
			<button
				class="btn join-item {subdivisions == 2 ? 'btn-primary' : ''}"
				on:click={() => {
					subdivisions = 2;
				}}><EightNote /></button
			>
			<button
				class="btn join-item {subdivisions == 3 ? 'btn-primary' : ''}"
				on:click={() => {
					subdivisions = 3;
				}}><TripletNote /></button
			>
			<button
				class="btn join-item {subdivisions == 4 ? 'btn-primary' : ''}"
				on:click={() => {
					subdivisions = 4;
				}}><SixteenthNote /></button
			>
		</div>
	</div>
</div>
<div>
	<input type="range" min="30" max="120" class="range range-primary" bind:value={bpm} />
</div>
