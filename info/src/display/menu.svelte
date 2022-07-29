<script>
	import { menu } from '#data/menu.js';
</script>

<header>
	{#each menu as item}
		<a href={`#${item}`}>{item}</a>
	{/each}
</header>
