import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	root: 'examples/counter-app',
	build: {
		outDir: '../../dist',
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'Revo',
			fileName: 'revo',
		},
		rollupOptions: {
			external: [],
		},
	},
	plugins: [],
	resolve: {
		alias: {
			revo: path.resolve(__dirname, 'src/index.ts'),
		},
	},
	esbuild: {
		jsxFactory: 'Revo',
		jsxFragment: 'Fragment',
	},
});
