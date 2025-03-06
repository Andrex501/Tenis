import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist', // Asegúrate de que los archivos generados se coloquen en la carpeta 'dist'
  },
  base: '/', // Base URL de la aplicación en Render
})
