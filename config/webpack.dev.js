var commonConfig = require('./webpack.common.js');

var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var helpers = require('./helpers');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ENV = process.env.ENV = process.env.NODE_ENV = 'development';

var HOST = process.env.HOST || 'localhost';
var PORT = process.env.PORT || 3245;

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('dist'),
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        })
    ],

    devServer: {
        host: HOST,
        port: PORT,
        historyApiFallback: true,
        stats: 'minimal',
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    }
});