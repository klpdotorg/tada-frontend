var path = require('path');
var webpack = require('webpack');
var configFile = require('./settings/config.json');

module.exports = {
    entry: [
      path.resolve(__dirname, 'app/main.js')
    ],
    devtool: "#cheap-eval-source-map",
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    module: {
      loaders: [
        {test: /\.woff|\.woff2|\.svg|.eot|\.ttf|\.png|\.gif|\.ico|\.html/, loader: 'file-loader'},
        {test: /\.json$/, loader: 'file-loader'},
        {test: /\.css$/, loader: "style!css"},
        {test: /\.scss$/, loader: 'style!css!sass'},
        {test: /\.js$/, exclude: /node_modules/, loader: "babel"},
        {test: /\.jsx$/, exclude: /node_modules/, loader: "babel"}      

      ]
    },
    resolve: {
      extensions: ['', '.js', '.json', '.css', '.jsx', '.json']
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
             "window.jQuery": "jquery"
        }),
        new webpack.IgnorePlugin(/\/iconv-loader$/)
    ],
    externals: {
        'config': JSON.stringify(configFile)
    }
};
