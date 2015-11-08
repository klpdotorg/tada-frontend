var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require("./webpack.config.js");
var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
  contentBase: "./build"
});
server.listen(8080, function() {
  console.log('TADA listening on *:', 8080);
});
