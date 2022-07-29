<!-- Displays nutrients data as table -->
<script>
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import { nutrients } from '#data/nutrients.js'

	const nutBuf = writable(nutrients);
	let search = new String()

	onMount(() => {
		// if path provided,
		if (urlParams !== '/') {
			search = decodeURI(urlParams.substring(1))
			if (search.includes('_')) {
				// change underscores to spaces
				search = search.replace(/_/g, ' ');
			}
			// normalize text and set to search
			hdlSearch()
		}
	})

	function hdlSearch() {
		// TODO:: Case insensitive
		let filtered =  nutrients.filter(n => n.name.includes(search) );
		// TODO:: If filtered.length === 0...
		nutBuf.set(filtered);
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

