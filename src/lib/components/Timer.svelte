<script lang="ts">
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
