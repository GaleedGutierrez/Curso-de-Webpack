const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const output = {
	path                : path.resolve(__dirname, 'dist'),
	filename            : '[name].[contenthash].js',
	assetModuleFilename : 'assets/images/[hash][ext][query]'
};

const resolve = {
	extensions : ['.js'],
	alias      : {
		'@utils'     : path.resolve(__dirname, 'src/utils/'),
		'@templates' : path.resolve(__dirname, 'src/templates/'),
		'@styles'    : path.resolve(__dirname, 'src/styles/'),
		'@images'    : path.resolve(__dirname, 'src/assets/images/'),
	}
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

const rulesFonts = {
	test      : /\.(woff|woff2|eot|ttf|otf)$/i,
	type      : 'asset/resource',
	generator : {
		filename : 'assets/fonts/[name].[contenthash][ext][query]',
	},
};

const plugins = [
	new HtmlWebpackPlugin({
		title    : 'Development',
		inject   : true,
		template : './public/index.html',
		filename : './index.html'
	}),
	new MiniCssExtractPlugin({
		filename : 'assets/[name].[contenthash].css'
	}),
	new CopyPlugin({
		patterns : [{
			from : path.resolve(__dirname, 'src', 'assets/images'),
			to   : 'assets/images'
		}]
	}),
	new Dotenv(),
	new BundleAnalyzerPlugin()
];

const devServer = {
	static             : path.join(__dirname, 'dist'),
	compress           : true,
	historyApiFallback : true,
	port               : 3006,
};

module.exports = {
	entry   : './src/index.js',
	output,
	resolve,
	mode    : 'development',
	// watch   : true,
	devtool : 'source-map',
	// devtool : 'inline-source-map',
	module  : {
		rules : [
			rulesJavascript,
			rulesCSS,
			rulesAssets,
			rulesFonts
		]
	},
	plugins,
	devServer
};
