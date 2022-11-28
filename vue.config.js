const path = require("path")
const glob = require("glob-all")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const PurgecssPlugin = require("purgecss-webpack-plugin")
const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ["production"].includes(process.env.NODE_ENV)
module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false,
  runtimeCompiler: false,
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src"))
    if (process.env.VUE_APP_MODE === 'analyze') {
      config
        .plugin('webpack-bundle-analyzer')
        .use(BundleAnalyzerPlugin)
    }
  },
  configureWebpack: config => {
    config.optimization = {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 1000000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    }
    config.performance = {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    }
    if (IS_PROD) {
      const plugins = []
      plugins.push(
        new PurgecssPlugin({
          paths: glob.sync([
            path.join(__dirname, "./src/**/*.vue"),
            path.join(__dirname, "./src/**/*.scss")
          ])
        })
      )
      config.plugins = [...config.plugins, ...plugins]
      config.devtool = 'none'
    } else {
      config.devtool = 'source-map'
    }
  },
  css: {
    extract: false,
    sourceMap: false,
    modules: false
  },
  parallel: require('os').cpus().length > 1,
  devServer: {
    open: false,
    host: '127.0.0.1',
    port: 8080,
    compress: true,
    https: false,
    hotOnly: true,
  }
}
