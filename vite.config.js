import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '^/v[0-9]+.*': {
        target: 'https://3r8wb2ev.api.sanity.io',
        changeOrigin: true,
        secure: false,
      },
      '/apicdn.sanity.io': {
        target: 'https://3r8wb2ev.apicdn.sanity.io',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
