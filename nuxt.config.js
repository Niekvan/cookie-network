import pkg from './package'

require('dotenv').config()

export default {
  mode: 'universal',
  server: {
    port: process.env.PORT
  },
  env: {
    WS_URL: process.env.WS_URL,
    EXTENSION_ID: process.env.EXTENSION_ID
  },

  /*
   ** Headers of the page
   */
  head: {
    title: 'The Cookie Network',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'i,consent,i consent,niek,van,sleeuwen,niek van sleeuwen,van sleeuwen,thesis,master,masters,infoprmation,design,information design,design academy,eindhoven,design academy eindhoven,cookies,cookie,network,project'
      }
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/icon.png' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~assets/scss/main.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt'
  ],
  /*
   ** Global Sas variables and mixins
   */
  styleResources: {
    scss: ['./assets/scss/abstracts/*.scss']
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true
  },

  proxy: {
    '/api': {
      target: process.env.API_URL,
      changeOrigin: true,
      headers: {
        'access-token': process.env.LOCAL_API_KEY
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
      config.module.rules.unshift({
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'responsive-loader',
          options: {
            placeholder: true,
            quality: 85,
            placeholderSize: 30,
            name: 'img/[name].[hash:hex:7].[width].[ext]'
          }
        }
      })
      config.module.rules.forEach(value => {
        if (String(value.test) === String(/\.(png|jpe?g|gif|svg|webp)$/)) {
          value.test = /\.(svg|webp)$/
        }
      })
    }
  }
}
