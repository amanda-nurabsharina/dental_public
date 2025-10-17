// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      // ...existing rules
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always', // Allow self-closing on void elements like <img/>
            normal: 'always',
            component: 'always'
          },
          svg: 'always',
          math: 'always'
        }
      ]
    }
  }
)
