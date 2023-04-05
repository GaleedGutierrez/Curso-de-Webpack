const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const output = {
	path       : path.resolve(__dirname, 'dist'),
	filename   : 'bundle.js',
	publicPath : '/',
};
const alias = {
	'@components' : path.resolve(__dirname, 'src/components/'),
	'@styles'     : path.resolve(__dirname, 'src/styles/')
};

const resolve = {
	extensions : [ '.js', '.jsx' ],
	alias
};

const rulesForJavaScript = {
	test    : /\.(js|jsx)$/,
	exclude : /node_modules/,
	use     : {
		loader : 'babel-loader'
	}
};

const rulesForHtml = {
	test : /\.html$/,
	use  : {
		loader : 'html-loader'
	}
};

const rulesForCss = {
	test : /\.s[ac]ss$/,
	use  : [ 'style-loader', 'css-loader', 'sass-loader' ]
};

const plugins = [
	new HtmlWebpackPlugin({
		template : './public/index.html',
		filename : './index.html'
	}),
	new MiniCssExtractPlugin({
		filename : '[name].css'
	}),
	new CleanWebpackPlugin(),
];

const optimization = {
	minimize  : true,
	minimizer : [
		new CssMinimizerPlugin(),
		new TerserPlugin(),
	]
};

module.exports = {
	entry  : './src/index.js',
	output,
	resolve,
	mode   : 'production',
	module : {
		rules : [
			rulesForJavaScript,
			rulesForHtml,
			rulesForCss
		]
	},
	plugins,
	optimization,
};
