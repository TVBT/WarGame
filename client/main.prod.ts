/**
 * Created by thinhth2 on 2/17/2017.
 */

import {enableProdMode} from "@angular/core";
import {runApp} from "./main";

if (ENV && 'production' === ENV) {
    // Production
    enableProdMode();
}


runApp();