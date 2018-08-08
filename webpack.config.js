const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: 'bundle[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            include:[path.resolve(__dirname, 'src','style')],
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Main Page',
            filename: 'pages/index.html',
            template: path.resolve(__dirname, 'index.html'),
            chunks: ['main']
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};