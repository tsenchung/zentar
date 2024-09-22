<script lang="ts">
	import Exercises from './Exercises.svelte';
	import Sessions from './Sessions.svelte';
</script>

<div role="tablist" class="tabs tabs-bordered">
	<!--
		<input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Sessions" checked />
		<div role="tabpanel" class="tab-content p-10"><Sessions /></div>
	-->

	<input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Exercises" checked />
	<div role="tabpanel" class="tab-content p-10"><Exercises /></div>
</div>
