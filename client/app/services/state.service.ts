/**
 * Created by thinhth2 on 2/6/2017.
 */

import { Injectable, EventEmitter } from '@angular/core';

var SCREEN_STATE = {
    LOGIN: 'login',
    LOBBY: 'lobby',
    PLAY: 'play',
    WAIT_SERVER: 'wait_server'
};

@Injectable()
class StateService {
    screenState = SCREEN_STATE.WAIT_SERVER;
    screenStateChange = new EventEmitter();

    getScreenState() {
        return this.screenState;
    }

    showLogin(data?) {
        this.screenState = SCREEN_STATE.LOGIN;
        this.screenStateChange.emit({state: this.screenState, data: data});
    }

    showLobby(data?) {
        this.screenState = SCREEN_STATE.LOBBY;
        this.screenStateChange.emit({state: this.screenState, data: data});
    }

    showPlay(data?) {
        this.screenState = SCREEN_STATE.PLAY;
        this.screenStateChange.emit({state: this.screenState, data: data});
    }
}

export {
    SCREEN_STATE,
    StateService
}