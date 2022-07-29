import path from 'path';
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
	plugins: [svelte()],
	resolve: {
		alias: {
			'#data': path.resolve('./src/data'),
			'#display': path.resolve('./src/display'),
			'#style': path.resolve('./src/style')
		}
	}
})
