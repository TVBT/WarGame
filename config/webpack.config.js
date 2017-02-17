/**
 * Created by thinhtran on 1/31/17.
 */

const helpers = require('./helpers');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const METADATA = {
    outputFile: "app.min.js",
    baseUrl: '/WarGame/dist/'
};

module.exports = {
    entry: {
        'main': './client/main.prod.ts',
        'lib': './client/lib.ts'
    },
    output: {
        path: "./dist",
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            {test: /\.ts?$/, loader: "ts-loader"},
            {test: /\.css$/, loaders: 'style-loader!css-loader'}
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main', 'lib']
        }),
        new HtmlWebpackPlugin({
            template: 'client/prodindex.html',
            chunksSortMode: 'dependency',
            metadata: METADATA,
            inject: 'body'
        }),
        new CopyWebpackPlugin([
            {from: 'client/assets', to: 'assets'},
            {from: 'client/styles.css'}
        ])
    ]
};