/**
 * Created by thinhtran on 1/31/17.
 */

const webpack = require("webpack");
const webpackMerge = require('webpack-merge');
const commonConfig = require("./webpack.config");


module.exports = webpackMerge(commonConfig, {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
});