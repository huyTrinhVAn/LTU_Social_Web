import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: [
      'latrobeweb.duckdns.org',
      '.duckdns.org',  // Cho phép tất cả subdomain duckdns.org
    ],
    watch: {
      usePolling: true
    },
    proxy: {
      "/api": {
        target: "http://api:5000",
        changeOrigin: true,
      },
    },
  },
});