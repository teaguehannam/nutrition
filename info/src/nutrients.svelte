<!-- Displays nutrients data as table -->
<script>
	import './nutrients.scss';
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import { nutrients } from './nutrients.js' // JSON

	const nutBuf = writable(nutrients);
	let search = new String()

	onMount(() => {
		// set first part of path to search input 
		if (urlParams !== '/') {
			search = decodeURI(urlParams.substring(1))
			if (search.includes('_')) {
				// change underscores to spaces
				search = search.replace(/_/g, ' ');
			}
			hdlSearch() // filter nutrients based on search
		}
	})

	function hdlSearch() {
		// search nutrients for nutrient.name === search
		let filtered =  nutrients.filter(n => n.name.includes(search) );
		nutBuf.set(filtered);
	}

</script>

<main>

	<table>
		<tr>
			<th>
				<input type='text' placeholder='name' bind:value={search} on:keyup={() => hdlSearch()} />
			</th> 
			<th>notes</th>
		</tr>
		{#each $nutBuf as nutrient}
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
