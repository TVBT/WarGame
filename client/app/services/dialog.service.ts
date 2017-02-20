/**
 * Created by thinhth2 on 2/20/2017.
 */

import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class DialogService {

    static ENDGAME = "endgame";

    onAppend = new EventEmitter();
    onCloseAll = new EventEmitter();
    onPop = new EventEmitter();

    showEndGame(data) {
        var dialog = {
            name: DialogService.ENDGAME,
            data: data
        };

        this.onAppend.emit(dialog);
    }

    closeAll() {
        this.onCloseAll.emit();
    }

    pop() {
        this.onPop.emit();
    }

}