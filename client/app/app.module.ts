import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {LoginScreen} from "./screens/login/login.screen";
import {LobbyScreen} from "./screens/lobby/lobby.screen";
import {PlayScreen} from "./screens/play.screen";
import {UserService} from "./services/user.service";

@NgModule({
    imports: [BrowserModule],
    declarations: [
        AppComponent,
        LoginScreen,
        LobbyScreen,
        PlayScreen
    ],
    providers: [
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
