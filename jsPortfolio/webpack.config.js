const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

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

const rulesAssets = {
	test : /\.png$/,
	type : 'asset/resource'
};

const plugins = [
	new HtmlWebpackPlugin({
		inject   : true,
		template : './public/index.html',
		filename : './index.html'
	}),
	new MiniCssExtractPlugin(),
	new CopyPlugin({
		patterns : [{
			from : path.resolve(__dirname, 'src', 'assets/images'),
			to   : 'assets/images'
		}]
	}),
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
			rulesCSS,
			rulesAssets,
		]
	},
	plugins
};
