import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent}  from './app.component';
import {LoginScreen} from "./screens/login/login.screen";
import {LobbyScreen} from "./screens/lobby/lobby.screen";
import {PlayScreen} from "./screens/play.screen";
import {UserService} from "./services/user.service";
import {CommandService} from "./services/command.service";
import {StateService} from "./services/state.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        LoginScreen,
        LobbyScreen,
        PlayScreen
    ],
    providers: [
        UserService,
        CommandService,
        StateService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
