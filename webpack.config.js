module.exports = {
	entry:
	{
		App: [ "./app/main.js",
		"webpack-dev-server/client?http://localhost:8080/"
		]
	},
	output: {
		path: '/',
		filename: "bundle.js",
		publicPath: 'http://localhost:8080/'
	},
	module: {
		loaders: [
			{test: /\.css$/, loader: "style!css"},
			{test: /\.scss$/, loader: 'style!css!sass'},
			{test: /\.js$/, loaders: ['jsx','babel'], exclude: /node_modules/ }]
    },
    resolve: {
      extensions: ['', '.js', '.json', '.css']
    }
  }
