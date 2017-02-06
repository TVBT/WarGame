/**
 * Created by thinhtran on 1/31/17.
 */

var path = require('path');
var ROOT = path.resolve(__dirname, '..');

function isWebpackDevServer() {
    return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
}

var root = path.join.bind(path, ROOT);

exports.isWebpackDevServer = isWebpackDevServer;

