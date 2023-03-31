const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const output = {
	path                : path.resolve(__dirname, 'dist'),
	filename            : '[name].[contenthash].js',
	assetModuleFilename : 'assets/images/[hash][ext][query]'
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

// webpack 4
// const rulesFonts = {
// 	test : /\.(woff|woff2)$/,
// 	use  : {
// 		loader  : 'url-loader',
// 		options : {
// 			limit      : 10_000,
// 			mimetype   : 'application/font-woff',
// 			name       : '[name].[ext]',
// 			outputPath : './assets/fonts/',
// 			publicPath : './assets/fonts/',
// 			esModule   : false,
// 		}
// 	}
// };

const rulesFonts = {
	test      : /\.(woff|woff2|eot|ttf|otf)$/i,
	type      : 'asset/resource',
	generator : {
		filename : 'assets/fonts/[name].[contenthash][ext][query]',
	},
};

const plugins = [
	new HtmlWebpackPlugin({
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
];

const optimization = {
	minimize  : true,
	minimizer : [
		new CssMinimizerPlugin(),
		new TerserPlugin(),
	]
};

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
			rulesFonts
		]
	},
	plugins,
	optimization
};
