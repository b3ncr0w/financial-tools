import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import yaml from '@rollup/plugin-yaml'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    yaml({
      include: ['**/*.yaml', '**/*.yml']
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '/src': path.resolve(__dirname, 'src')
    }
  },
  publicDir: false,
})
