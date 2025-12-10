import tailwindcss from '@tailwindcss/vite';
import { getVuetifyTheme } from './config/design-tokens';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8080/api/v1',
    },
  },
  modules: [
    'vuetify-nuxt-module',
    '@nuxt/eslint', // 'vuetify-nuxt-module',
    '@vee-validate/nuxt',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
  ],
  css: ['~/assets/css/main.css', '~/assets/css/globals.scss'],
  vite: {
    plugins: [tailwindcss()],
  },
  googleFonts: {
    families: {
      Urbanist: {
        wght: [300, 400, 500, 600, 700],
        ital: [300, 400, 500, 600, 700],
      },
    },
    display: 'swap',
    preload: true,
    download: true,
    base64: false,
  },
  vuetify: {
    moduleOptions: {
      /* module specific options */
      /* https://www.youtube.com/watch?v=aamWg1TuC3o */
      disableVuetifyStyles: true,
      styles: {
        configFile: 'assets/css/components.scss',
      },
      // Enable Vuetify Labs components
      labComponents: ['VTimePicker', 'VDateInput'],
    },
    vuetifyOptions: {
      theme: {
        themes: {
          // Use centralized design tokens to ensure sync between Tailwind and Vuetify
          light: getVuetifyTheme(),
        },
      },
      defaults: {
        // global: {
        //   ripple: false,
        // },
        VBtn: {
          color: 'primary',
          variant: 'flat',
          rounded: 'pill',
          elevation: 0,
          style: 'text-transform: none; letter-spacing: normal;',
        },
        VCard: {
          elevation: 0,
          rounded: 'lg',
        },
        VTextField: {
          variant: 'outlined',
          color: 'primary',
        },
        VSelect: {
          variant: 'outlined',
          color: 'primary',
        },
      },
    },
  },
  features: {
    inlineStyles: false,
  },
});
