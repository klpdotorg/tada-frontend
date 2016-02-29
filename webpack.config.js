var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
      path.resolve(__dirname, 'app/main.js')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
      loaders: [
        {test: /\.woff|\.woff2|\.svg|.eot|\.ttf|\.png|\.gif|\.ico|\.html/, loader: 'file?name=assets/fonts/bootstrap/[name].[ext]'},
        {test: /\.css$/, loader: "style!css"},
        {test: /\.scss$/, loader: 'style!css!sass'},
        {test: /\.js$/, loaders: ['jsx','babel'], exclude: /node_modules/ }

      ]
    },
    resolve: {
      extensions: ['', '.js', '.json', '.css']
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
             "window.jQuery": "jquery"
        })
    ]
};
