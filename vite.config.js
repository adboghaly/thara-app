import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons.svg', 'thara_logo.png'],
      manifest: {
        name: 'Thara Finance',
        short_name: 'Thara',
        description: 'Premium Personal Finance App',
        theme_color: '#1A1A2E',
        background_color: '#0d0d1a',
        display: 'standalone',
        icons: [
          {
            src: '/thara_logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/thara_logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
