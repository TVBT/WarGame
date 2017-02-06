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
    constructor(private commandService:CommandService) {

    }

    ngOnInit() {
        this.commandService.start();
    }
}