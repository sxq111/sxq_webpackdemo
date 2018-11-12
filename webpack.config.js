const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: 'bundle[name][hash:8].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                include: [path.resolve(__dirname, 'src', 'style')],
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /(\.js)|(\.jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Main Page',
            filename: 'index.html',
            template: path.resolve(__dirname, 'index.html'),
            // chunks: ['main']
        }),
        // new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        nodeEnv: 'production'
    }
};