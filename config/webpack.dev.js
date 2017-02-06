/**
 * Created by thinhtran on 1/31/17.
 */

const path = require("path");
const webpack = require("webpack");
const webpackMerge = require('webpack-merge');
const commonConfig = require("./webpack.config");


module.exports = webpackMerge(commonConfig, {
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
});