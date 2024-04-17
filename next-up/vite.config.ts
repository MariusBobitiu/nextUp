/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    include: ['**/__tests__/**/*.test.[tj]s'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
    ],
    testTimeout: 20000,
  },
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(dirname(fileURLToPath(import.meta.url)), './src'),
    }
  }
})
