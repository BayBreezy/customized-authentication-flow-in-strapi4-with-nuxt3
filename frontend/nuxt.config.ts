// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "nuxt-icon",
    "@samk-dev/nuxt-vcalendar",
    "@vee-validate/nuxt",
    "@morev/vue-transitions/nuxt",
    "@nuxtjs/strapi",
  ],

  tailwindcss: { exposeConfig: true },
  colorMode: { classSuffix: "" },
  imports: {
    imports: [
      { from: "tailwind-variants", name: "tv" },
      { from: "tailwind-variants", name: "VariantProps", type: true },
      { from: "vue-sonner", name: "toast", as: "useSonner" },
    ],
  },

  app: {
    head: {
      title: "Custom Auth Flow",
      titleTemplate: "%s - Custom Auth Flow",
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/pdfmake.min.js",
          defer: true,
        },
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/vfs_fonts.min.js",
          defer: true,
        },
      ],
    },
  },

  build: { transpile: ["vue-sonner"] },

  strapi: {
    cookie: { maxAge: 60 * 60 * 24 * 30 },
    cookieName: "XYZ",
    auth: { populate: ["role"] },
    url: process.env.STRAPI_URL,
  },
});
