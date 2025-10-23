import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Thêm dòng này
    port: 3000,
    watch: {
      usePolling: true  // Thêm dòng này - quan trọng cho Docker
    },
    proxy: {
      "/api": {
        target: "http://api:5000",
        changeOrigin: true,
      },
    },
  },
});