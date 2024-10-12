<header class="flex justify-between items-end mb-4">
	<div>
		<nav class="breadcrumbs text-sm">
			<slot name="breadcrumbs" />
		</nav>
		<h1 class="text-xl"><slot name="title" /></h1>
	</div>
	<div class="flex gap-2">
		<slot name="actions" />
	</div>
</header>
