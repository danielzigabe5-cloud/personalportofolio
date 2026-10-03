export default defineNuxtConfig({
  compatibilityDate: '2026-10-03',

  devtools: {
    enabled: true
  },

  css: [
    '~/assets/css/main.css'
  ],

  modules: [
    '@nuxtjs/tailwindcss'
  ],

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