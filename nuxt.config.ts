
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-11-10',

  runtimeConfig: {
    adminEmail: '',
    adminPasswordHash: '',
    adminSessionSecret: ''
  },

  devtools: {
    enabled: true
  },

  css: [
    '~/assets/css/main.css'
  ],

  vite: {
    plugins: [tailwindcss()]
  },

  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    }
  },

  app: {
    head: {
      title: 'DZ Admin Panel',
      meta: [
        {
          name: 'description',
          content: 'Daniel Zigabe Personal Portfolio Admin Dashboard'
        }
      ]
    }
  }
})
