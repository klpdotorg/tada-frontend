module.exports = {
	entry: 
	{ 
		App: [ "./js/components/main.js", 
		"webpack-dev-server/client?http://localhost:8080/"
		]
	},
	output: {
		path: './build',
		filename: "bundle.js",
		publicPath: 'http://localhost:8080/'
	},
	module: {
		loaders: [
			//CSS
			{test: /\.css$/, loader: "style!css"},
			//SASS
			{
				test: /\.scss$/,
				loader: 'style!css!sass'
			},
			{
                test: /\.js$/,
                loaders: ['jsx','babel'],
                exclude: /node_modules/
            }
		]
	},
	resolve: {
		extensions: ['', '.js', '.json', '.css']
	}
}