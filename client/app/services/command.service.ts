/**
 * Created by thinhth2 on 2/6/2017.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class CommandService {
    socket;

    start() {
        var url = 'ws://127.0.0.1:9191/'; // localhost
        // var url = 'ws://10.8.14.200:9191/'; // a Thức
        this.socket = io(url);
        this.socket.on('connect', function(){alert("connect")});
        this.socket.on('event', function(data){alert("event")});
        this.socket.on('disconnect', function(){alert("disconnect")});
    }
}