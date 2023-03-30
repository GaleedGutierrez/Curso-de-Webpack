const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const output = {
	path     : path.resolve(__dirname, 'dist'),
	filename : 'main.js'
};

const rulesJavascript = {
	test    : /\.m?js$/,
	exclude : /node_modules/,
	use     : {
		loader : 'babel-loader'
	}
};

const rulesCSS = {
	test : /\.css|.styl$/i,
	use  : [
		MiniCssExtractPlugin.loader,
		'css-loader',
		'stylus-loader'
	]
};

const plugins = [
	new HtmlWebpackPlugin({
		inject   : true,
		template : './public/index.html',
		filename : './index.html'
	}),
	new MiniCssExtractPlugin(),
];

module.exports = {
	entry   : './src/index.js',
	output,
	resolve : {
		extensions : ['.js']
	},
	module : {
		rules : [
			rulesJavascript,
			rulesCSS
		]
	},
	plugins
};
