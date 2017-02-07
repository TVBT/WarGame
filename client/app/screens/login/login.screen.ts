/**
 * Created by thinhth2 on 2/6/2017.
 */
import {Component, OnInit} from '@angular/core';
import {CommandService} from "../../services/command.service";

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

    constructor() {

    }

    ngOnInit() {

    }

    onUsernameChanged() {
        // this.errorMsg = "Tài khoản đã tồn tại";

        this.userValidate = this.username && this.username.length > 0;
        if (!this.userValidate) {
            this.errorMsg = "";
        }
    }
}