import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },

  resolve: {
    alias: {
      '~bootstrap': '/node_modules/bootstrap',
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // Proxy API requests to Express backend
      '/api2': 'http://localhost:5001', // Proxy API requests to Express backend
      '/api/live': {
        target: 'http://localhost:5000', // Ensure the target URL matches the WebSocket namespace
        ws: true,  // Enable WebSocket proxy
        changeOrigin: true,
      },
      '/api/live/cursor-ws': {
        target: 'http://localhost:5002', // Ensure the target URL matches the WebSocket namespace
        ws: true,  // Enable WebSocket proxy
        changeOrigin: true,
      },
    },
  }
})
