import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/voucher/',
  server: {
    host: true,
    allowedHosts: ['sternitic-inocencia-erringly.ngrok-free.dev']
  }
})
