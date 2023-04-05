const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const output = {
	path     : path.resolve(__dirname, 'dist'),
	filename : 'bundle.js'
};

const resolve = {
	extensions : [ '.js', '.jsx' ]
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

const devServer = {
	static   : path.join(__dirname, 'dist'),
	compress : true,
	port     : 3006
};

const plugins = [
	new HtmlWebpackPlugin({
		template : './public/index.html',
		filename : './index.html'
	})
];

module.exports = {
	entry  : './src/index.js',
	output,
	resolve,
	module : {
		rules : [
			rulesForJavaScript,
			rulesForHtml
		]
	},
	devServer,
	plugins
};
