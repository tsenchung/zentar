<script lang="ts">
	import { onMount } from 'svelte';
	import * as alphaTab from '@coderline/alphatab';

	export let tex: string;
	let api: alphaTab.AlphaTabApi;
	$: {
		try {
			if (api && tex.length > 0) {
				api.tex(tex);
			}
		} catch(error) {
			console.log(error);
		}
	}

	let main: HTMLElement;
	onMount(() => {
		const settings = {
			core: {
				fontDirectory: '/font/'
			}
		};
		api = new alphaTab.AlphaTabApi(main, settings);
	});
</script>

<div class="at-wrap">
	<div class="at-content">
		<div class="at-viewport">
			<div class="at-main" bind:this={main}></div>
		</div>
	</div>
</div>

<style>
	.at-wrap {
		width: 80vw;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		position: relative;
		background-color: white;
	}
	.at-content {
		position: relative;
		overflow: hidden;
		flex: 1 1 auto;
	}
</style>
