import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
	input: 'src/index.ts',
	output: [
		{
			file: 'dist/revo.js',
			format: 'umd',
			name: 'Revo',
			sourcemap: true,
		},
		{
			file: 'dist/revo.min.js',
			format: 'umd',
			name: 'Revo',
			plugins: [terser()],
			sourcemap: true,
		},
	],
	plugins: [resolve(), commonjs(), typescript()],
};
