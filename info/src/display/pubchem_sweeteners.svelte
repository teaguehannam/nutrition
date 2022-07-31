<!-- Displays nutrients data as table -->
<script>
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import { pubchem_sweeteners } from '#data/pubchem_sweeteners.js';

	const PubC = 'https://pubchem.ncbi.nlm.nih.gov/compound/'
	let search = new String();
</script>

<main id="sweeteners">
	<h2>Sweeteners</h2>
	<table>
		<tr>
			<th><input type='text' placeholder='name' bind:value={search}/></th> 
			<th>notes</th>
		</tr>
		{#each pubchem_sweeteners as sweet}
			<tr>
				<td>{sweet.name}</td>
				<td class="Stacked">
					{#each sweet.notes as note}<code>{note}</code>{/each}
				</td>
				<td>
					<a title="View Pubchem" href={PubC+sweet.pubchem_id} >ℹ️</a>
				</td>
			</tr>
		{/each}
	</table>
	
</main>

