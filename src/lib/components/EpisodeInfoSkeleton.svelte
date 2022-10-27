<div class="grid lg:grid-cols-[.5fr_1fr] mt-32">
	<div class="w-full aspect-[200/283] bg-slate-700" />
	<div class="lg:ml-10 mt-10 lg:mt-0">
		<div class="h-6 w-24 bg-slate-700 mt-2" />
		<div class="flex flex-wrap mt-3">
			<div class="h-3 w-10 bg-slate-700 mr-3" />
			<div class="h-3 w-10 bg-slate-700 mr-3" />
			<div class="h-3 w-10 bg-slate-700 mr-3" />
			<div class="h-3 w-10 bg-slate-700 mr-3" />
			<div class="h-3 w-10 bg-slate-700 mr-3" />
		</div>
		<div class="flex flex-wrap mt-5">
			<div class="h-3 w-36 bg-slate-700 mr-3 mt-2" />
			<div class="h-3 w-14 bg-slate-700 mr-3 mt-2" />
			<div class="h-3 w-36 bg-slate-700 mr-3 mt-2" />
			<div class="h-3 w-14 bg-slate-700 mr-3 mt-2" />
			<div class="h-3 w-14 bg-slate-700 mr-3 mt-2" />
			<div class="h-3 w-48 bg-slate-700 mr-3 mt-2" />
		</div>
		<div class="grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 my-10 gap-4">
			{#each Array(40) as _}
				<div class="relative group">
					<div class="w-full aspect-video bg-slate-700" />

					<div class="flex justify-between items-center mt-3">
						<div class="bg-slate-700 h-3 w-14" />
						<div class="bg-slate-700 h-3 w-8" />
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
