import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'examples/nexora-app',
  build: {
    outDir: './dist',
    minify: true,
    cssMinify: true,
    // lib: {
    //   entry: path.resolve(__dirname, 'src/index.ts'),
    //   name: 'Nexora',
    //   fileName: 'nexora',
    // },
    rollupOptions: {
      external: [],
    },
  },
  plugins: [],
  resolve: {
    alias: {
      nexora: path.resolve(__dirname, 'src/index.ts'),
    },
  },
  esbuild: {
    jsxFactory: 'Nexora',
    jsxFragment: 'Fragment',
  },
});
