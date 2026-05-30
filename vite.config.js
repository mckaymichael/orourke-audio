import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Proxy WP REST API calls to avoid CORS issues during development
    proxy: {
      '/wp-json': {
        target: 'http://orourke-audio.local',
        changeOrigin: true,
      },
    },
  },
})
