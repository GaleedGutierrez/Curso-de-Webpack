import * as path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
	entry  : './src/index.ts',
	output : {
		path     : path.resolve(__dirname, 'dist'),
		filename : 'main.js'
	},
	resolve : {
		extensions : ['.ts'],
	},
	module : {
		rules : [
			{
				test    : /\.ts?$/,
				exclude : /node_modules/,
				use     : {
					loader  : 'babel-loader',
					options : {
						presets : [ '@babel/preset-env', '@babel/preset-typescript' ]
					}
				}
			},
		]
	},
};

export default config;
