import { Component } from '@angular/core';

var STATE = {
  LOGIN: 'login',
  LOBBY: 'lobby',
  PLAY: 'play'
};

@Component({
  selector: 'app',
  template: `
    <div>
        <login-screen *ngIf="state=='${STATE.LOGIN}'"></login-screen>
        <lobby-screen *ngIf="state=='${STATE.LOBBY}'"></lobby-screen>
        <play-screen *ngIf="state=='${STATE.PLAY}'"></play-screen>
    </div>
  `,
})
export class AppComponent  {
  name = 'Angular';

  state = STATE.LOGIN;
}
