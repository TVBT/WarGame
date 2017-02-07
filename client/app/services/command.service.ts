/**
 * Created by thinhth2 on 2/6/2017.
 */
import {Injectable, EventEmitter} from '@angular/core';
import {StateService} from "./state.service";

@Injectable()
export class CommandService {
    socket;
    socketReady = false;
    onMessage = new EventEmitter();

    constructor(private stateService:StateService) {

    }

    start() {
        // var url = 'ws://10.8.14.205:9191/'; // a Vũ
        var url = 'ws://127.0.0.1:9191/'; // localhost
        // var url = 'ws://10.8.14.200:9191/'; // a Thức
        this.socket = io(url);
        this.socket.on('connect', () => {
            this.socketReady = true;
            this.stateService.showPlay();
        });
        this.socket.on('event', this.handleMessage.bind(this));
        this.socket.on('disconnect', () => {
            this.socketReady = false;
            alert("Mất kết nối");
            this.stateService.showLogin();
        });
    }

    handleMessage(data) {
        if (this.socketReady) {
            this.onMessage.emit(data);
        }
    }
}