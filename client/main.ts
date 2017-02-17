/// <reference path="../typings/custom.d.ts" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

var runApp = function() {
    platformBrowserDynamic().bootstrapModule(AppModule);
};

export {
    runApp
}


