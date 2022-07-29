<!-- Displays nutrients data as table -->
<script>
	import './sweeteners.scss';
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import { sweeteners } from './sweeteners.js'; // 

	const PubC = 'https://pubchem.ncbi.nlm.nih.gov/compound/'
	let search = new String();
</script>

<main>

	<table>
		<tr>
			<th>
				<input type='text' placeholder='name' bind:value={search}/>
			</th> 
			<th>notes</th>
		</tr>
		{#each sweeteners as swt}
			<tr>
				<td>{swt.name}</td>
				<td class="Stacked">
					{#each swt.notes as note}
						<code>{note}</code>
					{/each}
				</td>
				<td>
					<a title="View Pubchem" href={PubC + swt.pubchem_id} >
						ℹ️
					</a>
				</td>
			</tr>
		{/each}
	</table>
	
</main>
