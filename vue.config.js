const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  assetsDir: '',
  indexPath: 'index.html', // 相对于 outputDir
  filenameHashing: false, // 文件名哈希
  pages: undefined, // 在 multi-page 模式下构建应用
  productionSourceMap: true, // 不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  configureWebpack: {
    plugins: [
      // new MyAwesomeWebpackPlugin()
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, './statics'),
          to: 'statics',
          ignore: ['.*']
        }
      ])
    ]
  },

  css: {
    // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。
    // 设置为 true 后你就可以去掉文件名中的 .module
    // 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
    modules: false
  },
  // 开发服务器
  devServer: {
    proxy: {
      '/mock': {
        target: 'http://rap2api.taobao.org',
        pathRewrite: { '^/mock': '/' }
      },
      '/bocca': {
        // target: 'http://192.168.31.245:1805/bocca'
        target: 'http://boccaccio.3322.org:7383'
        // pathRewrite: { '^/bocca': '/' }
      },
      '/other': {
        target: 'https://ss1.bdstatic.com',
        pathRewrite: { '^/other': '/' }
      }
    },
    port: 8888
  }
}

module.exports = config
