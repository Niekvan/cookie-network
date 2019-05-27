module.exports = {
  apps: [
    {
      name: 'cookie prod',
      port: 3001,
      script: './node_modules/nuxt/bin/nuxt',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'cookie demo',
      port: 3002,
      script: './node_modules/nuxt/bin/nuxt',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
