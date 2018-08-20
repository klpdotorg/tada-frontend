const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const configFile = require('./settings/config.json');

module.exports = {
  mode: 'production',
  entry: {
    app: './app/main.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production',
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      parallel: true,
      uglifyOptions: {
        mangle: true,
        warnings: false, // Suppress uglification warnings
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      { test: /\.woff|\.woff2|\.svg|.eot|\.ttf|\.png|\.gif|\.ico|\.html/, loader: 'file-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/react'],
          },
        },
      },
    ],
  },
  externals: {
    'config': JSON.stringify(configFile),
  },
};
