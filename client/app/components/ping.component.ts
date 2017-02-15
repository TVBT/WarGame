/**
 * Created by thinhth2 on 2/15/2017.
 */
import {Component, OnInit} from '@angular/core';
import {CommandService} from "../services/command.service";
import {KeyExchange} from "../../../share/keyexchange";

@Component({
    selector: 'ping',
    template: `
    <div class="ping-text">
       {{ping}} ms
    </div>
  `,
    styles: [
        `
        .ping-text {
            color: #ffffff;
            background: #000;
            padding: 5px 15px;
        }
        `
    ]
})
export class PingComponent implements OnInit {
    ping:number = 0;
    interval;
    intervalTime = 1000;

    lastTime;

    constructor(private commandService:CommandService) {

    }

    ngOnInit() {
        this.commandService.onMessage.subscribe((msg) => {
            switch (msg.command) {
                case KeyExchange.KEY_COMMAND.PING_PONG:
                    this.receiveRequest();
                    break;
            }
        });
        this.commandService.socketReadyListener.subscribe(() => {
           this.interval = setInterval(this.sendRequest.bind(this), this.intervalTime);
        });
    }

    sendRequest() {
        this.commandService.ping();
        this.lastTime = Date.now();
    }

    receiveRequest() {
        this.ping = Date.now() - this.lastTime;
    }
}