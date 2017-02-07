/**
 * Created by thinhth2 on 2/6/2017.
 */
import {Component, OnInit} from '@angular/core';
import {CommandService} from "../../services/command.service";
import {KeyExchange} from "../../../../share/keyexchange";

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

    constructor(private commandService:CommandService) {
        this.commandService.onMessage.subscribe((msg) => {
            this.userExist = !msg.data[KeyExchange.KEY_DATA.STATUS];
            if (this.userExist) {
                this.errorMsg = "Tên tài khoản đã tồn tại";
            }

            this.userValidate = this.username && this.username.length > 0;
            if (!this.userValidate) {
                this.errorMsg = "";
            }
        });
    }

    ngOnInit() {

    }

    onUsernameChanged() {
        // this.errorMsg = "Tài khoản đã tồn tại";
        this.commandService.verifyUsername(this.username);
    }
}