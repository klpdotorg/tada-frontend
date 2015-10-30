module.exports = {
	entry: "./components/main.js",
	output: {
		path: './build',
		filename: "bundle.js"
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