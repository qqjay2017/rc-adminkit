const HtmlWebpackPlugin = require('html-webpack-plugin')
const CommonConfigWebpackPlugin = require('@core/craco-config/src/common-config-webpack-plugin/src')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const path = require('node:path')

const NODE_ENV = process.env.NODE_ENV || 'production'
const isProduction = NODE_ENV === 'production'

function resolve(str) {
  return path.resolve(process.cwd(), str)
}

const _target = 'https://test-ymsl.kxgcc.com:30195'
const config = {

  mode: NODE_ENV,
  plugins: [
    // new BundleAnalyzerPlugin({}),
    new CommonConfigWebpackPlugin({
      mode: NODE_ENV,
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true,
      chunks: ['index'],
    }),
  ],

  entry: {
    index: './src/main.tsx',

  },
  devServer: {
    proxy: [
      {
        context: ['/api/', '/public/', '/openapi/', '/auth/', '/cms-static/', '/component-shared-center/'],
        target: _target,
        changeOrigin: true,
        pathRewrite: { '^': '' },

      },
    ],

  },

}

module.exports = config
