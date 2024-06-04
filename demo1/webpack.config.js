const HtmlWebpackPlugin = require("html-webpack-plugin")

const path = require("path")

module.exports = (env) => {
  return {
  	mode: "development",
  	output: {
  		filename: "index.js",
  		path: path.resolve(__dirname, "dist"),
  		libraryTarget: env.production ? "system" : ""
  	},
  	module: {
  		rules: [
  			{
  				test: /\.js$/,
  				use: {
  					loader: "babel-loader"
  				},
  				exclude: /node_modules/
  			}
  		]
  	},
  	plugins: [
  		!env.production && new HtmlWebpackPlugin({
  			template: "./public/index.html"
  		})
  	].filter(Boolean),
  	// 公共资源
  	externals: env.production ? ["react", "react-dom"] : []
  }
}
// 我们将子应用 打包为类库 在主应用之中加载这个库（systemjs）
// 