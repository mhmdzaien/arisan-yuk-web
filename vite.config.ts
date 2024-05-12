import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',

      manifest: {
        name: 'Arisan Yasinan',
        display: 'standalone',
        start_url: '/',
        theme_color: '#32a852',
        icons: [
          {
            src: 'img/icons/icon48.png',
            sizes: '48x48',
            type: 'image/png'
          },
          {
            src: 'img/icons/icon72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: 'img/icons/icon96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: 'img/icons/icon144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: 'img/icons/icon192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'img/icons/icon512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap')
    }
  }
})
