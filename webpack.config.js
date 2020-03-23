const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isDevMode = process.env.NODE_ENV !== 'production'

// Main const
const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist')
}

module.exports = {
  devtool: isDevMode ? 'eval-cheap-module-source-map' : 'none',
  entry: ['babel-polyfill', `${PATHS.src}/index.js`],
  output: {
    filename: isDevMode ? 'js/[name].js' : 'js/[name].[hash].js',
    path: PATHS.dist,
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: '/node_modules/',
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDevMode
          }
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: './postcss.config.js'
            }
          }
        }
      ]
    }]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.html`,
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: isDevMode ? `css/[name].css` : `css/[name].[hash].css`
    }),
    new CopyWebpackPlugin([{
      from: `${PATHS.src}/static`,
      to: `${PATHS.dist}`
    }])
  ]
}