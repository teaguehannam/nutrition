<script>
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import { nutrients } from './nutrients.js' // JSON

	const nutBuf = writable(nutrients);
	const urlParams = window.location.pathname;
	let search = new String();

	onMount(() => {
		// set URL path to search input
		if (urlParams !== '/') {
			search = decodeURI(urlParams.substring(1))
			if (search.includes('_')) {
				search = search.replace(/_/g, ' ');
			}
			hdlSearch() 
		}
	})

	function hdlSearch() {
		// search nutrients for nutrient.name === search
		let filtered =  nutrients.filter(n => n.name.includes(search) );
		nutBuf.set(filtered);
	}

</script>

<h1>Nutrient Info</h1>

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
