<script lang="ts">
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
	<h1 class="text-2xl">{data.exercise.title}</h1>
	<pre>
{data.exercise.aid.text}
    </pre>
</main>
