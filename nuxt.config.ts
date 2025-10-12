import tailwindcss from '@tailwindcss/vite'
import { createResolver } from '@nuxt/kit'
const resolver = createResolver(import.meta.url)
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
    resolve: {
      alias: {
        '.prisma/client/index-browser':
          // https://vite.dev/config/shared-options.html#resolve-alias
          // When aliasing to file system paths, always use absolute paths.
          resolver.resolve('./node_modules/@prisma/client/index-browser.js'),
      },
    },
  },
  routeRules: {
    '/admin/**': {
      ssr: false,
      appMiddleware: ['authenticated'],
    },
  },
})
