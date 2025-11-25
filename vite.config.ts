import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Use absolute paths for assets
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // During development, forward API requests to the local backend server
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
