<script lang="ts">
	export let a1: number;
	export let a2: number;

	export let r1: number;
	export let r2: number;
	export let active: boolean;
	export let onclick: () => void;
	export let tabindex: number;
	export let ariaLabel: string;
</script>

<path
	role="button"
	{tabindex}
	class="btn arc {active ? 'btn-primary' : 'inactive'}"
	aria-label={ariaLabel}
	on:click={onclick}
	on:keypress={(ev) => {
		if (ev.key == 'Enter') {
			onclick();
		}
	}}
	stroke="black"
	fill="transparent"
	d="M {r1 * Math.cos(a1)} {r1 * Math.sin(a1)} 
        L {r2 * Math.cos(a1)} {r2 * Math.sin(a1)} 
        A {r2} {r2} 0 0 1 {r2 * Math.cos(a2)} {r2 * Math.sin(a2)} 
        L {r1 * Math.cos(a2)} {r1 * Math.sin(a2)} 
        A {r1} {r1} 0 0 0 {r1 * Math.cos(a1)} {r1 * Math.sin(a1)}"
/>

<style>
	.inactive:hover {
		fill: color-mix( in oklab, oklch(var(--btn-color, var(--b2)) / var(--tw-bg-opacity, 1)) 90%, black );
	}

	.arc {
		fill: oklch(var(--btn-color, var(--b2)) / var(--tw-bg-opacity));
	}
</style>
