<script lang="ts">
	import type { DisplayParameters } from '$lib';

	export let parameters: DisplayParameters;
</script>

<g transform="translate({parameters.head.width},{parameters.marginTop})">
	<slot />
</g>
