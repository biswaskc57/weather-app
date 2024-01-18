/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.tsx',
	output: {
		// eslint-disable-next-line no-undef
		path: path.resolve(__dirname,'..', './build'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [{
					loader: 'ts-loader' ,
					options: {
						compilerOptions: {
							noEmit: false,
						},
					},
				}],
				exclude: /node_modules/,
        
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
				exclude: /node_modules/,
			},
			{
				rules: [
					{
						test: /\.css$/,
						use: ['style-loader', 'css-loader'],
					},
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
				exclude: /node_modules/,
				use: ['file-loader?name=[name].[ext]']
			}
		],
	},
	devServer: {
		static: {
			directory: path.join(__dirname, '/')
		},
		compress: true,
		historyApiFallback: true,
		port: 3000,
	},
	plugins: [ new HtmlWebpackPlugin({
		template: './public/index.html'})]
};
