<script>
	import { writable } from 'svelte/store'

	import Fda_Nutrients from '#display/fda_nutrients.svelte'
	import Pubchem_Sweeteners from '#display/pubchem_sweeteners.svelte'

	const options = ['fda_nutrients', 'pubchem_sweeteners']
	const display = writable('');
</script>

<header>
	{#each options as item}
		<button on:click={() => display.set(item)} >{item}</button>
	{/each}
</header>

{#if $display === 'fda_nutrients'}<Fda_Nutrients/>{/if}
{#if $display === 'pubchem_sweeteners'}<Pubchem_Sweeteners/>{/if}

