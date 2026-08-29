// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/icon'
  ],

  devtools: {
    enabled: true
  },

  app: {
    baseURL: '/Cellular-Discovery-Device-Manager/',
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/Cellular-Discovery-Device-Manager/favicon.svg' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },
    '/devices': { ssr: false }
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    prerender: {
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  icon: {
    serverBundle: false
  }
})
