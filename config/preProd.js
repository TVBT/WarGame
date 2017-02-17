/**
 * Created by thinhth2 on 2/17/2017.
 */

var copyfiles = require('copyfiles');
var recursive = require('recursive-readdir');
var mv = require('mv');

const buildFolder = "dist";
const tmpFolder = "tmp";

recursive('client/app', ["*.ts", "*.js", "*.map"], function (err, files) {
    var copyPaths = [].concat(files);
    copyPaths.push(tmpFolder);
    console.log(copyPaths);
    copyfiles(copyPaths, "-f", function() {
        mv(tmpFolder+"/client", buildFolder, function(err) {});
    });
});