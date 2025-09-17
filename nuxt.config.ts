// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/image", "vuetify-nuxt-module"],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
      theme: {
        themes: {
          light: {
            dark: false,
            colors: {
              white: "#FFFFFF", // #FFFFFF
              black: "#000000", // #000000
              primary: "#00813D", // #00813D
              "primary-20": "#E6FFEA", // #E6FFEA
              background: "F6F8FA", // #F6F8FA
            },
          },
        },
      },
    },
  },
});
