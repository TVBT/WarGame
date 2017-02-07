import {Component, OnInit} from '@angular/core';
import {StateService, SCREEN_STATE} from "./services/state.service";
import {CommandService} from "./services/command.service";


@Component({
    selector: 'app',
    template: `
    <div>
        <div *ngIf="screenState=='${SCREEN_STATE.WAIT_SERVER}'"
             class="waiting">Connecting To Server...</div>
        <login-screen *ngIf="screenState=='${SCREEN_STATE.LOGIN}'"></login-screen>
        <lobby-screen *ngIf="screenState=='${SCREEN_STATE.LOBBY}'"></lobby-screen>
        <play-screen *ngIf="screenState=='${SCREEN_STATE.PLAY}'"></play-screen>
    </div>
  `,
    styles: [
        `
        .waiting {
            color: #fff;
            margin: 8% auto;
            display: block;
            text-align: center;
        }
        `
    ]
})
export class AppComponent implements OnInit {
    name = 'Angular';

    screenState;

    constructor(private stateService:StateService,
                private commandService:CommandService) {
        this.screenState = this.stateService.getScreenState();
        this.stateService.screenStateChange.subscribe((state) => {
            this.screenState = state;
        });
    }

    ngOnInit() {
        setTimeout(() => {
            this.commandService.start();
        }, 1000);

    }
}
