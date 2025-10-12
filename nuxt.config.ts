import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@prisma/nuxt',
    'nuxt-auth-utils',
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  routeRules: {
    '/admin/**': {
      ssr: false,
      appMiddleware: ['authenticated'],
    },
  },
})
