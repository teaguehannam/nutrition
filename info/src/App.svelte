<script>
	import { writable } from 'svelte/store';
	import { nutrients } from './nutrients.js'; // JSON

	const nutBuf = writable(nutrients);
	let search = new String();
	let nutrientsWithNotes = $nutBuf.filter(n => n.notes).length;
	let percentComplete = parseInt(nutrientsWithNotes / $nutBuf.length * 100);

	const hdlSearch = () => {
		// filter nutrients where search string is included in nutrient.name
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
