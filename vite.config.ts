import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist', // Spécifie explicitement le dossier de sortie
    chunkSizeWarningLimit: 1600, // Augmente la limite pour les gros chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // Optimisation du découpage des bundles
          react: ['react', 'react-dom'],
          lucide: ['lucide-react'],
        },
      },
    },
  },
  server: {
    port: 3000, // Port par défaut pour le dev
  },
});