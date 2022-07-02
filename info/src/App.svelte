<script>
	import { writable } from 'svelte/store';
	import { nutrients } from './nutrients.js'; // JSON

	// displayBuf is filterable, reactive, and used to generate HTML below
	// used by HTML to generate each nutrient into a row
	const displayBuf = writable(nutrients);
	let search = new String(); // html value

	// how many nutrients have notes 
	let nutrientsWithNotes = $displayBuf.filter(n => n.notes).length;
	let percentComplete = parseInt(nutrientsWithNotes / $displayBuf.length * 100);

	const hdlSearch = () => {
		let searchBuf =  nutrients.filter(n => n.name.toLowerCase().includes(search.toLowerCase()))
		displayBuf.set(searchBuf)
	}
</script>

<h1>{nutrientsWithNotes} out of {$displayBuf.length} have notes [{percentComplete}%]</h1>

<main>

	<table>
		<tr on:keyup={hdlSearch} >
			<th><input type='text' bind:value={search} placeholder='name' /></th>
			<th>Notes</th>
		</tr>
		{#each $displayBuf as nutrient}
			<tr>
				<td>{nutrient.name}</td>
				<td class="NoteStack">
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
