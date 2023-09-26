import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/app': 'http://localhost:8080', // Thay đổi URL của API theo đúng địa chỉ của ứng dụng CodeIgniter 4
    },
  },
})
