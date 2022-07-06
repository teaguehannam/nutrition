<script>
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import { nutrients } from './nutrients.js' // JSON

	// if any pathname, set it as search
	onMount(() => {
		if (urlParams !== '/') {
			search = decodeURI(urlParams.substring(1))
			if (search.includes('_')) {
				search = search.replace(/_/g, ' ');
			}
			hdlSearch()
		}
	})
	
	const urlParams = window.location.pathname;
	const nutBuf = writable(nutrients);
	let search = new String();
	let nutrientsWithNotes = $nutBuf.filter(n => n.notes).length;
	let percentComplete = parseInt(nutrientsWithNotes / $nutBuf.length * 100);
	
	// check URL for nutrient

	const hdlSearch = () => {
		let searchBuf =  nutrients.filter(n => n.name.toLowerCase().includes(search.toLowerCase()));
		nutBuf.set(searchBuf);
	}

</script>


<main>
	
	<header>
		<h1>{nutrientsWithNotes} out of {$nutBuf.length} have notes [{percentComplete}%]</h1>
	</header>

	<table>
		<tr on:keyup={hdlSearch} >
			<th><input type='text' bind:value={search} placeholder='name' /></th>
			<th>notes</th>
		</tr>
		{#each $nutBuf as nutrient}
			<tr>
				<td>{nutrient.name}</td>
				<td class="Stackem">
					{#if nutrient.notes}
						{#each nutrient.notes as note}
							<code>{note}</code>
						{/each}
					{/if}
				</td>
			</tr>
		{/each}
	</table>
	
</main>
