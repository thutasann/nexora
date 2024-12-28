import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'examples/nexora-app',
  build: {
    emptyOutDir: true,
    outDir: '../../dist',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Nexora',
      fileName: 'nexora',
    },
    rollupOptions: {
      external: [],
    },
  },
  plugins: [],
  resolve: {
    alias: {
      nexora: path.resolve(__dirname, 'src/index.ts'),
      '@': path.resolve(__dirname, './'),
    },
  },
  esbuild: {
    jsxFactory: 'Nexora',
    jsxFragment: 'Fragment',
  },
});
