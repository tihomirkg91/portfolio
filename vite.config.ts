import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: id => {
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom')
          ) {
            return 'vendor';
          }

          if (id.includes('node_modules/pdfmake') || id.includes('pdfmake')) {
            return 'pdf-libs';
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
