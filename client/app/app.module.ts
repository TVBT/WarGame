import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {LoginScreen} from "./screens/login.screen";
import {LobbyScreen} from "./screens/lobby.screen";
import {PlayScreen} from "./screens/play.screen";

@NgModule({
    imports: [BrowserModule],
    declarations: [
        AppComponent,
        LoginScreen,
        LobbyScreen,
        PlayScreen
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
