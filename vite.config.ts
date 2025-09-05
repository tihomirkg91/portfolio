import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 2500,
    rollupOptions: {
      output: {
        manualChunks: id => {
          if (id.includes('node_modules/react')) {
            return 'react';
          }

          if (id.includes('node_modules/react-dom')) {
            return 'react-dom';
          }

          if (id.includes('node_modules/react-icons')) {
            return 'icons';
          }

          if (id.includes('node_modules/moment')) {
            return 'moment';
          }

          if (id.includes('node_modules')) {
            return 'vendor-misc';
          }
        },
      },
    },
  },
});
