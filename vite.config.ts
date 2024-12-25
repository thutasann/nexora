import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	root: 'src/examples/counter-app',
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'), // Main library entry
			name: 'Revo',
			fileName: 'revo-framework',
			formats: ['es', 'cjs'],
		},
		rollupOptions: {
			external: [],
		},
	},
	resolve: {
		alias: {
			'revo-framework': path.resolve(__dirname, 'dist/revo-framework.es.js'),
		},
	},
	esbuild: {
		jsxFactory: 'Revo',
		jsxFragment: 'Fragment',
	},
});
