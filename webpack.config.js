const path = require('path');
const configFile = require('./settings/config.json');

module.exports = {
  mode: 'development',
  entry: [
    path.resolve(__dirname, 'app/main.js')
  ],
  devtool: '#cheap-eval-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.woff|\.woff2|\.svg|.eot|\.ttf|\.png|\.gif|\.ico|\.html/, loader: 'file-loader' },
      { test: /\.json$/, loader: 'file-loader' },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader" },  
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.css'],
  },
  externals: {
    'config': JSON.stringify(configFile),
  },
};
