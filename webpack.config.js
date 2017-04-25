const path = require('path');
const fs = require("fs");
const webpack = require('webpack');

module.exports = {
  entry: ['react-hot-loader/patch',
          'webpack-dev-server/client?http://localhost:9000',
          'webpack/hot/only-dev-server',
          './src/main/web/main/js/index.js'],
  devServer: {
    contentBase: path.join(__dirname, "target/classes/static"),
    compress: true,
    hot: true,
    port: 9000,
    proxy: {
      "/api": "http://localhost:8080"
    },
    setup: function (app) {
      app.use(function pushStateHook(req, res, next) {
        if (req.url === '/' || req.url === '/about' || req.url.startsWith('/recipe/')) {
          const indexFile = __dirname + '/src/main/resources/templates/home.html';
          res.setHeader("Content-Type", "text/html");
          fs.createReadStream(indexFile).pipe(res);
        } else if (req.url === '/css/styles.css') {
          res.setHeader("Content-Type", "text/css");
          res.send('');
        } else {
          next();
        }
      });
    }
  },
  devtool: 'source-map',
  cache: true,
  output: {
    path: path.join(__dirname, 'target/classes/static'),
    filename: 'js/bundle.js',
    publicPath: 'http://localhost:9000/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ["es2015", {"modules": false}],
              "react"
            ],
            plugins: [
              "react-hot-loader/babel",
              "transform-class-properties"
            ]
          }
        },
      },
      {
        test: /\.s?css$/,
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