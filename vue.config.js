const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
  // devServer: {
  //   proxy: {
  //     '^/api': {
  //       target: 'https://passwordmanager.liveblog365.com/',
  //       changeOrigin: true
  //     },
  //   }
  // }
})

// module.exports = {
//   devServer: {
//   proxy: 'https://passwordmanager.liveblog365.com/',
//   }
//   }