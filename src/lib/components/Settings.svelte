<script lang="ts">
	import { fretboardSettings } from '$lib/settings';
	import { ToneClass } from '$lib/theory/tones';
</script>

<section>
	<h1 class="text-2xl">Settings</h1>
	<section class="mt-4">
		<h2 class="text-xl mb-2">Tuning</h2>
		<div class="join join-vertical w-full">
			<div class="collapse collapse-arrow join-item border-base-300 border">
				<input type="radio" name="my-accordion-1" checked />
				<div class="collapse-title font-medium">Bass</div>
				<div class="collapse-content">
					<div class="form-control">
						<label class="label cursor-pointer">
							<span class="label-text">EADG</span>
							<input
								type="radio"
								name="tuning"
								class="radio checked:bg-primary"
								bind:group={$fretboardSettings.strings}
								value={[ToneClass.G, ToneClass.D, ToneClass.A, ToneClass.E]}
							/>
						</label>
					</div>
					<div class="form-control">
						<label class="label cursor-pointer">
							<span class="label-text">BEADG</span>
							<input
								type="radio"
								name="tuning"
								class="radio checked:bg-primary"
								bind:group={$fretboardSettings.strings}
								value={[ToneClass.G, ToneClass.D, ToneClass.A, ToneClass.E, ToneClass.B]}
							/>
						</label>
					</div>
					<div class="form-control">
						<label class="label cursor-pointer">
							<span class="label-text">EADGC</span>
							<input
								type="radio"
								name="tuning"
								class="radio checked:bg-primary"
								bind:group={$fretboardSettings.strings}
								value={[ToneClass.C, ToneClass.G, ToneClass.D, ToneClass.A, ToneClass.E]}
							/>
						</label>
					</div>
					<div class="form-control">
						<label class="label cursor-pointer">
							<span class="label-text">BEADGC</span>
							<input
								type="radio"
								name="tuning"
								class="radio checked:bg-primary"
								bind:group={$fretboardSettings.strings}
								value={[
									ToneClass.C,
									ToneClass.G,
									ToneClass.D,
									ToneClass.A,
									ToneClass.E,
									ToneClass.B
								]}
							/>
						</label>
					</div>
				</div>
			</div>
			<div class="collapse collapse-arrow join-item border-base-300 border">
				<input type="radio" name="my-accordion-1" />
				<div class="collapse-title font-medium">Guitar</div>
				<div class="collapse-content">
					<div class="form-control">
						<label class="label cursor-pointer">
							<span class="label-text">EADGBE</span>
							<input
								type="radio"
								name="tuning"
								class="radio checked:bg-primary"
								bind:group={$fretboardSettings.strings}
								value={[
									ToneClass.E,
									ToneClass.B,
									ToneClass.G,
									ToneClass.D,
									ToneClass.A,
									ToneClass.E
								]}
							/>
						</label>
					</div>
					<div class="form-control">
						<label class="label cursor-pointer">
							<span class="label-text">FACGCE</span>
							<input
								type="radio"
								name="tuning"
								class="radio checked:bg-primary"
								bind:group={$fretboardSettings.strings}
								value={[
									ToneClass.E,
									ToneClass.C,
									ToneClass.G,
									ToneClass.C,
									ToneClass.A,
									ToneClass.F
								]}
							/>
						</label>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="mt-4">
		<h2 class="text-xl mb-2">Frets</h2>
		<div class="join">
			<input
				class="join-item btn"
				type="radio"
				name="frets"
				aria-label="12"
				bind:group={$fretboardSettings.frets}
				value={12}
			/>
			<input
				class="join-item btn"
				type="radio"
				name="frets"
				aria-label="21"
				bind:group={$fretboardSettings.frets}
				value={21}
			/>
			<input
				class="join-item btn"
				type="radio"
				name="frets"
				aria-label="24"
				bind:group={$fretboardSettings.frets}
				value={24}
			/>
		</div>
	</section>
	<section class="mt-4">
		<h2 class="text-xl mb-2">Fretboard</h2>
		<div class="flex flex-col gap-2">
			<label>
				String spacing
				<input
					type="range"
					min="0"
					max="100"
					bind:value={$fretboardSettings.stringSpacing}
					class="range range-primary"
				/>
			</label>
			<label>
				Margin Top
				<input
					type="range"
					min="0"
					max="100"
					bind:value={$fretboardSettings.marginTop}
					class="range range-primary"
				/>
			</label>
			<label>
				Margin Left
				<input
					type="range"
					min="0"
					max="100"
					bind:value={$fretboardSettings.head.width}
					class="range range-primary"
				/>
			</label>
			<label>
				Note Radius
				<input
					type="range"
					min="0"
					max="100"
					bind:value={$fretboardSettings.note.radius}
					class="range range-primary"
				/>
			</label>
			<label>
				Fret Spacing
				<input
					type="range"
					min="0"
					max="100"
					bind:value={$fretboardSettings.fret.spacing}
					class="range range-primary"
				/>
			</label>
		</div>
	</section>
</section>
