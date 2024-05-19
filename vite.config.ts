import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [svgr(), react(), tsconfigPaths({ root: './' })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'tests/setup.tsx',
    css: true
  },
  build: {
    outDir: 'build',
    cssCodeSplit: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      },
      treeshake: true
    }
  },
  base: '/',
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: 'localhost',
    port: 3000,
    open: true
  },
  css: {
    devSourcemap: true
  }
});
