<script>
	import '../app.css';
</script>

<header>
	<nav class="navbar bg-base-100">
		<div class="flex-1">
			<a class="btn btn-ghost text-xl" href="/">Zentar</a>
		</div>
		<div class="flex-none">
			<ul class="menu menu-horizontal px-1">
				<li><a href="/">Visualizer</a></li>
				<li><a href="/">Metronome</a></li>
				<li><a href="/">Practice</a></li>
			</ul>
		</div>
	</nav>
</header>
<section class="p-6">
	<slot></slot>
</section>
