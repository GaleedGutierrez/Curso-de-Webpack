const path = require('path');


const output = {
	path     : path.resolve(__dirname, 'dist'),
	filename : 'bundle.js'
};

const resolve = {
	extensions : [ '.js', '.jsx' ]
};

const rules = [
	{
		test    : /\.(js|jsx)$/,
		exclude : /node_modules/,
		use     : {
			loader : 'babel-loader'
		}
	}
];

const devServer = {
	static   : path.join(__dirname, 'dist'),
	compress : true,
	port     : 3006
};

module.exports = {
	entry  : './src/index.js',
	output,
	resolve,
	module : {
		rules
	},
	devServer
};
