import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		lib: {
			entry: 'src/index.ts',
			name: 'Revo',
			fileName: (format) => `revo.${format}.js`,
		},
		rollupOptions: {
			external: [], // Add external dependencies if needed
			output: {
				globals: {}, // Add globals for UMD if needed
			},
		},
	},
});
