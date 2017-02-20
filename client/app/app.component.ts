import {Component, OnInit} from '@angular/core';
import {StateService, SCREEN_STATE} from "./services/state.service";
import {CommandService} from "./services/command.service";


@Component({
    selector: 'app',
    template: `
    <div>
        <div *ngIf="screenState=='${SCREEN_STATE.WAIT_SERVER}'"
             class="waiting">Connecting To Server...</div>
        <login-screen *ngIf="screenState=='${SCREEN_STATE.LOGIN}'" [data]='data' ></login-screen>
        <lobby-screen *ngIf="screenState=='${SCREEN_STATE.LOBBY}'" [data]='data' ></lobby-screen>
        <play-screen *ngIf="screenState=='${SCREEN_STATE.PLAY}'" [data]='data' ></play-screen>
    </div>
    <ping class="ping"></ping>
    <server-select class="server-select"></server-select>
  `,
    styles: [
        `
        .waiting {
            color: #fff;
            margin: 8% auto;
            display: block;
            text-align: center;
        }
        .ping {
            position: fixed;
            top: 0;
            right: 0;
        }
        
        .server-select {
            position: fixed;
            top: 0;
            right: 100px;
        }
        `
    ]
})
export class AppComponent implements OnInit {
    name = 'Angular';

    screenState;
    data;

    constructor(private stateService:StateService,
                private commandService:CommandService) {
        this.screenState = this.stateService.getScreenState();
        this.stateService.screenStateChange.subscribe((msg) => {
            this.screenState = msg.state;
            this.data = msg.data;
        });
    }

    ngOnInit() {

    }
}
