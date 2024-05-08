// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui','@hypernym/nuxt-anime','vue3-carousel-nuxt','@pinia/nuxt','@nuxt/image',

  ],
  css:['./assets/css/custom.css','remixicon/fonts/remixicon.css'],
  
})
