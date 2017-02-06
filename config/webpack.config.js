/**
 * Created by thinhtran on 1/31/17.
 */

const helpers = require('./helpers');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const METADATA = {
    title: 'Type Script Webpack Starter Kit',
    outputFile: "app.min.js",
    baseUrl: '/',
    isDevServer: helpers.isWebpackDevServer()
};

module.exports = {
    entry: "./client/index.ts",
    output: {
        path: "./dist",
        filename: METADATA.outputFile
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.ts?$/, loader: "ts-loader" }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'client/index.html',
            chunksSortMode: 'dependency',
            metadata: METADATA,
            inject: 'head'
        })
    ]
};