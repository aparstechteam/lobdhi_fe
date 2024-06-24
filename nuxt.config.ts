// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
 app:{
  head: {
    title: 'Lobdhi',
    titleTemplate: '%s - Achieve',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Chemshifu' }, 

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
 },
  modules: [
    "@nuxt/ui",
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt', 
    
  ],
  css: [
    '~/assets/style.css'
  ],
  colorMode: {
    preference: "light",
  },
  ssr: false
});
