/**
 * Created by thinhth2 on 1/23/2017.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the src folder
            src: 'src',
            // angular bundles
            'vue': '../node_modules/vue/dist/vue.min.js',
            'vue-class-component': '../node_modules/vue-class-component/dist/vue-class-component.min.js',

        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            src: {
                main: './app.js',
                defaultExtension: 'js'
            },
            'angular2-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            }
        }
    });
})(this);