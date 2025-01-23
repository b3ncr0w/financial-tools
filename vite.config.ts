import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import yaml from '@rollup/plugin-yaml'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), yaml()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
    copyPublicDir: true,
  },
  publicDir: 'src/cms',
  assetsInclude: ['**/*.yaml', '**/*.yml'],
})
