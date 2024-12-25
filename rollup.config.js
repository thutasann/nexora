import typescript from '@rollup/plugin-typescript';

export default {
	input: 'src/index.ts',
	output: [
		{
			file: 'dist/revo-framework.cjs.js',
			format: 'cjs',
			exports: 'named', // Export named exports for CommonJS
		},
		{
			file: 'dist/revo-framework.esm.js',
			format: 'esm',
		},
	],
	plugins: [
		typescript({
			tsconfig: './tsconfig.json',
		}),
	],
	external: ['tslib'],
};
