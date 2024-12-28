import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      external: [],
    },
  },
  plugins: [],
  resolve: {},
  esbuild: {
    jsxFactory: 'Nexora',
    jsxFragment: 'Fragment',
  },
});
