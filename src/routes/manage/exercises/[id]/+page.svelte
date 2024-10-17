<script lang="ts">
	import GuitarVisualization from '$lib/components/GuitarVisualization.svelte';
	import Header from '$lib/components/Header.svelte';
	import Metronome from '$lib/components/metronome/Metronome.svelte';
	import { fretboardSettings } from '$lib/settings';
	import { onDestroy } from 'svelte';

	export let data;

	onDestroy(() => {
		data.client.close();
	});
</script>

<svelte:head>
	<title>Exercise: {data.exercise.title}</title>
</svelte:head>
<main>
	<Header>
		<ul slot="breadcrumbs">
			<li><a href="/manage/exercises">Exercises</a></li>
			<li>{data.exercise.title}</li>
		</ul>
		<svelte:fragment slot="title">{data.exercise.title}</svelte:fragment>
	</Header>
	{#if data.exercise.aid.type == 'AidText'}
		<pre>
{data.exercise.aid.text}
</pre>
	{:else if data.exercise.aid.type == 'AidVisualizer'}
		<GuitarVisualization
			options={$fretboardSettings}
			highlightMode={data.exercise.aid.highlightMode}
		/>
	{/if}
	<div class="metronome w-96 h-56 mt-8"><Metronome /></div>
</main>
