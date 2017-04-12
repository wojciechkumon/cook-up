const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/main/web/main/js/index.js',
  output: {
    path: path.join(__dirname, 'target/classes/static'),
    filename: 'js/bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin({
      filename: 'css/styles.css'
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.s?css$/,
        exclude: /(node_modules)/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: /(node_modules)/,
        loader: 'file-loader?name=/fonts/[name].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        exclude: /(node_modules)/,
        loader: 'file-loader?name=/img/[name].[ext]'
      }
    ]
  }
};