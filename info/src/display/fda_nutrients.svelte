<!-- Displays nutrients data as table -->
<script>
	import { writable } from 'svelte/store'
	import { fda_nutrients } from '#data/fda_nutrients.js'

	const tblData = writable(fda_nutrients);
	let search = new String()

	function hdlSearch() {
		// TODO:: Case insensitive
		let filtered =  fda_nutrients.filter(n => n.name.includes(search) );
		// TODO:: If filtered.length === 0...
		tblData.set(filtered);
	}

</script>

<main id="nutrients">
	<h2>Nutrients</h2>
	<table>
		<tr>
			<th>
				<input type='text' placeholder='name' bind:value={search} on:keyup={() => hdlSearch()} />
			</th> 
			<th>notes</th>
		</tr>
		{#each $tblData as nutrient}
			<tr>
				<td>{nutrient.name}</td>
				<td class="Stacked">
					{#each nutrient.notes as note}
						<code>{note}</code>
					{/each}
				</td>
			</tr>
		{/each}
	</table>
	
</main>

