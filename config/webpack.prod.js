/**
 * Created by thinhtran on 1/31/17.
 */

const webpack = require("webpack");
const webpackMerge = require('webpack-merge');
const commonConfig = require("./webpack.config");
const DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = webpackMerge(commonConfig, {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new DefinePlugin({
            'ENV': JSON.stringify("production"),
            'process.env': {
                'ENV': JSON.stringify("production")
            }
        })
    ]
});