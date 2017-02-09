/**
 * Created by thinhth2 on 2/6/2017.
 */
import {Component, OnInit} from '@angular/core';
import {CommandService} from "../../services/command.service";
import {KeyExchange} from "../../../../share/keyexchange";
import {StateService} from "../../services/state.service";
import {Resources} from "../../model/resources";
import {UserService} from "../../services/user.service";

@Component({
    moduleId: module.id,
    selector: 'login-screen',
    templateUrl: './login.screen.html',
    styleUrls: ['./login.screen.css']
})
export class LoginScreen implements OnInit {

    username = "";
    errorMsg = "";
    userExist = true;
    userValidate = false;
    isValid = false;

    constructor(private commandService:CommandService,
                private stateService:StateService,
                private userService:UserService)
    {
        this.commandService.onMessage.subscribe((msg) => {
            switch (msg.command) {
                case KeyExchange.KEY_COMMAND.CHECK_NICK_NAME:
                    this.onUsernameVerified(msg.data);
                    break;
                case KeyExchange.KEY_COMMAND.AUTO_JOIN_ROOM:
                    this.onAutoJoinRoom(msg.data);
            }
        });
    }

    ngOnInit() {

    }

    onUsernameChanged() {
        if (!this.username) {
            this.userValidate = this.username && this.username.length > 0;
            return;
        }
        // this.errorMsg = "Tài khoản đã tồn tại";
        this.commandService.verifyUsername(this.username);
    }

    onUsernameVerified(data) {
        this.userExist = !data[KeyExchange.KEY_DATA.STATUS];
        if (this.userExist) {
            this.errorMsg = Resources.bundle.existAccount;
            this.isValid = false;
        } else {
            this.errorMsg = "";
            this.isValid = true;
        }

        this.userValidate = this.username && this.username.length > 0;
        if (!this.userValidate) {
            this.errorMsg = "";
        }
    }

    onJoinClick() {
        if (this.isValid) {
            this.commandService.autoJoinRoom(this.username);
        }
    }

    onAutoJoinRoom(data) {
        var status = data[KeyExchange.KEY_DATA.STATUS];
        if (status) {
            var user = this.userService.myUser();
            user.name = this.username;
            user.roomId = data[KeyExchange.KEY_DATA.ROOM_ID];
            user.playerInfo = data[KeyExchange.KEY_DATA.PLAYER_INFO];
            this.stateService.showLobby();
        } else {
            this.errorMsg = Resources.bundle.tryAgain;
        }
    }

}