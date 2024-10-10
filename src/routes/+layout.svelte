<script lang="ts">
	import Cog6 from '$lib/icons/Cog6.svelte';
	import '../app.css';
</script>

<div class="flex flex-col min-h-screen">
	<header>
		<nav class="navbar bg-base-100">
			<div class="flex-1">
				<a class="btn btn-ghost text-xl" href="/">Zentar</a>
			</div>
			<div class="flex flex-1 justify-end px-2">
				<div class="flex items-stretch">
					<a class="btn btn-ghost rounded-btn" href="/">Visualize</a>
					<a class="btn btn-ghost rounded-btn" href="/routines">Practice</a>
					<div class="dropdown dropdown-end">
						<div tabindex="0" role="button" class="btn btn-ghost rounded-btn" aria-label="Settings Menu">
							<Cog6 />
						</div>
						<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
						<ul
							tabindex="0"
							class="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-64 p-2 shadow"
						>
							<li><a href="/manage/exercises">Manage Exercises</a></li>
							<li><a href="/settings">Fretboard Settings</a></li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	</header>
	<div class="px-6 pb-4 flex-grow">
		<slot></slot>
	</div>

	<footer class="footer bg-neutral text-neutral-content p-10">
		<section>
			<section>
				<h2>Metronome Sounds</h2>
				<p>
					<a href="https://freesound.org/people/Druminfected/sounds/250552/">Metronome.wav</a> by
					<a href="https://freesound.org/people/Druminfected/">Druminfected</a>
					| License:
					<a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a>
				</p>
				<p>
					<a href="https://freesound.org/people/Druminfected/sounds/250551/">MetronomeUp.wav</a> by
					<a href="https://freesound.org/people/Druminfected/">Druminfected</a>
					| License:
					<a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a>
				</p>
			</section>
			<section>
				<h2>Music Icons</h2>
				<p>
					<a
						title="PianistHere, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons"
						href="https://commons.wikimedia.org/wiki/File:Quarter_note_with_upwards_stem.svg"
						><img
							width="8"
							alt="Quarter note with upwards stem"
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Quarter_note_with_upwards_stem.svg/8px-Quarter_note_with_upwards_stem.svg.png?20210123112410"
						/></a
					>
				</p>
				<p>
					<a
						title="User:PianistHere, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons"
						href="https://commons.wikimedia.org/wiki/File:8thNote.svg"
						><img
							width="64"
							alt="8thNote"
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/8thNote.svg/64px-8thNote.svg.png?20210405173428"
						/></a
					>
				</p>
				<p>
					<a
						title="Actormusicus, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons"
						href="https://commons.wikimedia.org/wiki/File:Semicroma.svg"
						><img
							width="32"
							alt="Semicroma"
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Semicroma.svg/32px-Semicroma.svg.png?20221014163836"
						/></a
					>
				</p>
			</section>
		</section>
	</footer>
</div>
