import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    proxy: {
      "/api": {
        target: "http://api:5000", // Thay 'api' bằng tên dịch vụ backend trong docker-compose
        changeOrigin: true,
      },
    },
  },
});
