var path = require('path');
var webpack = require('webpack');
var helpers = require('./helpers');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': helpers.root('client/polyfills.ts'),
        'vendor': helpers.root('client/vendor.ts'),
        'app': helpers.root('client/main.ts')
    },

    resolve: {
        extensions: ['', '.ts', '.js'],
        alias: {
            'jquery': helpers.root('node_modules/jquery/src/jquery'),
            'io': helpers.root('node_modules/socket.io-client/dist/socket.io'),
            'p2': helpers.root('node_modules/phaser/build/custom/p2'),
            'pixi': helpers.root('node_modules/phaser/build/custom/pixi'),
            'phaser': helpers.root('node_modules/phaser/build/custom/phaser-split')
        }
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                exclude: [/\.(spec|e2e)\.ts$/],
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|ico)([\?]?.*)$/,
                loader: 'file?name=assets/images/[name].[ext]'
            },
            {
                test: /\.(svg|woff|woff2|ttf|eot)([\?]?.*)$/,
                loader: 'file?name=assets/fonts/[name].[ext]'
            },
            {
                test: /\.(css)$/,
                loaders: ['to-string-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract(['css','less'])
            },
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css','sass?includePaths[]='+helpers.root('node_modules/compass-mixins/lib')])
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new CopyWebpackPlugin([
            {from: helpers.root('client/assets'), to: 'assets'}
        ]),

        new HtmlWebpackPlugin({
            template: helpers.root('client/index.html')
        }),

        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            'window.jQuery': 'jquery',
            moment: 'moment',
            io: 'io',
            p2: 'p2',
            Phaser: 'phaser',
            PIXI: 'pixi'
        })
    ]
};