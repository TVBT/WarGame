/**
 * Created by thinhth2 on 2/6/2017.
 */

import { Injectable, EventEmitter } from '@angular/core';

var SCREEN_STATE = {
    LOGIN: 'login',
    LOBBY: 'lobby',
    PLAY: 'play'
};

@Injectable()
class StateService {
    screenState = SCREEN_STATE.LOGIN;
    screenStateChange = new EventEmitter();

    getScreenState() {
        return this.screenState;
    }

    showLogin() {
        this.screenState = SCREEN_STATE.LOGIN;
        this.screenStateChange.emit(this.screenState);
    }

    showLobby() {
        this.screenState = SCREEN_STATE.LOBBY;
        this.screenStateChange.emit(this.screenState);
    }

    showPlay() {
        this.screenState = SCREEN_STATE.PLAY;
        this.screenStateChange.emit(this.screenState);
    }
}

export {
    SCREEN_STATE,
    StateService
}