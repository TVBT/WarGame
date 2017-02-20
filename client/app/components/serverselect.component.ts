/**
 * Created by thinhth2 on 2/20/2017.
 */

import {Component, OnInit} from '@angular/core';
import {CommandService} from "../services/command.service";
import {KeyExchange} from "../../../share/keyexchange";
import {StateService} from "../services/state.service";

@Component({
    selector: 'server-select',
    template: `
    <select [(ngModel)]="selectedServer" (ngModelChange)="onChangeServer()">
      <option *ngFor="let server of servers; let index=index;" 
              [ngValue]="server.url"
              >
        {{server.name}}
      </option>
    </select>
  `,
    styles: [
        `
            
        `
    ]
})
export class ServerSelectComponent implements OnInit {

    servers = [
        {name: "localhost", url: "ws://127.0.0.1:9191/"},
        {name: "Vũ", url: "ws://10.8.14.205:9191"},
        {name: "Thức", url: "ws://10.8.14.200:9191"},
        {name: "live", url: "ws://115.84.182.93:8050/"},
    ];
    selectedServer = this.servers[0].url;


    constructor(private commandService:CommandService, private stateService:StateService) {

    }

    ngOnInit() {
        setTimeout(() => {
            this.commandService.start(this.selectedServer);
        }, 1000);
    }

    onChangeServer() {
        this.stateService.showConnectServer();
        this.commandService.start(this.selectedServer);
    }
}