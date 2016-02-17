var path = require('path');

module.exports = {
    entry: [
      path.resolve(__dirname, 'app/main.js')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
      loaders: [
        {test: /\.woff|\.woff2|\.svg|.eot|\.ttf|\.png|\.gif|\.ico/, loader: 'file-loader'},
        {test: /\.css$/, loader: "style!css"},
        {test: /\.scss$/, loader: 'style!css!sass'},
        {test: /\.js$/, loaders: ['jsx','babel'], exclude: /node_modules/ }
        
      ]
    },
    resolve: {
      extensions: ['', '.js', '.json', '.css']
    }
};
