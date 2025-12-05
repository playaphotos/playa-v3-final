import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        cleanupOutdatedCaches: true, // Force delete old caches
        skipWaiting: true,
        clientsClaim: true,
      },
      manifest: {
        name: 'Playa Photos',
        short_name: 'PlayaPhotos',
        theme_color: '#4f46e5',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],
  build: {
    outDir: 'dist', // Keep this as dist, but we will force the clean below
    emptyOutDir: true, // This tells Vite to delete the folder before building
    sourcemap: false
  }
});