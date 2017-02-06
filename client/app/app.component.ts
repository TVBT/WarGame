import {Component} from '@angular/core';
import {StateService, SCREEN_STATE} from "./services/state.service";


@Component({
    selector: 'app',
    template: `
    <div>
        <login-screen *ngIf="screenState=='${SCREEN_STATE.LOGIN}'"></login-screen>
        <lobby-screen *ngIf="screenState=='${SCREEN_STATE.LOBBY}'"></lobby-screen>
        <play-screen *ngIf="screenState=='${SCREEN_STATE.PLAY}'"></play-screen>
    </div>
  `,
})
export class AppComponent {
    name = 'Angular';

    screenState;

    constructor(private stateService:StateService) {
        this.screenState = this.stateService.getScreenState();
        this.stateService.screenStateChange.subscribe((state) => {
           this.screenState = state;
        });
    }
}
