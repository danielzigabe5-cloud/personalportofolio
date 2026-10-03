export default defineNuxtConfig({
  compatibilityDate: '2026-10-03',

  devtools: {
    enabled: true
  },

  css: [
    '~/assets/css/main.css'
  ],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon'
  ],

  app: {
    head: {
      title: 'Alemu Mekete | Frontend Developer',

      meta: [
        {
          name: 'description',
          content: 'Personal portfolio of Alemu Mekete - Frontend Developer'
        }
      ]
    }
  }
})