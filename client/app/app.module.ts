import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent}  from './app.component';
import {LoginScreen} from "./screens/login/login.screen";
import {LobbyScreen} from "./screens/lobby/lobby.screen";
import {PlayScreen} from "./screens/play/play.screen";
import {UserService} from "./services/user.service";
import {CommandService} from "./services/command.service";
import {StateService} from "./services/state.service";
import {ClockPipe} from "./app.pipe";
import {PingComponent} from "./components/ping.component";
import {ServerSelectComponent} from "./components/serverselect.component";
import {DialogComponent} from "./components/dialog.component";
import {EndGameDialog} from "./dialogs/endgame/endgame.dialog";
import {DialogService} from "./services/dialog.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        LoginScreen,
        LobbyScreen,
        PlayScreen,
        PingComponent,
        ServerSelectComponent,
        DialogComponent,

        //Dialogs
        EndGameDialog,

        //Pipes
        ClockPipe
    ],
    providers: [
        UserService,
        CommandService,
        StateService,
        DialogService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
