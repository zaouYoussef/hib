import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // Nouvelle configuration ajoutée
  publicDir: 'public', // Spécifie le dossier public
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 4096, // Taille max en bytes pour l'inlining (4KB)
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]' // Format des noms de fichiers
      }
    }
  },
  // Pour le développement
  server: {
    host: true
  }
})