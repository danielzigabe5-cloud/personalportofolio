import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-07',

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
    externals: {
      inline: [
        /[\\/]node_modules[\\/]nuxt[\\/]dist[\\/]/
      ]
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