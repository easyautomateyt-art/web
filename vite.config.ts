import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Use absolute paths for assets
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  ssr: {
    // react-helmet-async ships CommonJS; bundle it so named imports work in the
    // prerender step (Node ESM cannot import its named exports otherwise).
    noExternal: ['react-helmet-async'],
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
