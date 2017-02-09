/**
 * Created by thinhth2 on 2/6/2017.
 */
import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {CommandService} from "../../services/command.service";
import {KeyExchange} from "../../../../share/keyexchange";

@Component({
    moduleId: module.id,
    selector: 'lobby-screen',
    templateUrl: './lobby.screen.html',
    styleUrls: ['./lobby.screen.css']
})
export class LobbyScreen implements OnInit {
    team1 = [];
    team2 = [];

    constructor(private userService:UserService,
                private commandService:CommandService) {
        this.commandService.onMessage.subscribe((msg) => {
            switch (msg.command) {
                case KeyExchange.KEY_COMMAND.GET_ROOM_INFO:
                    this.onGetRoomInfo(msg.data);
            }
        })
    }

    ngOnInit() {
        var user = this.userService.myUser();
        this.commandService.getRoomInfo(user.roomId);
    }

    private onGetRoomInfo(data) {
        [this.team1, this.team2] = data.playerlist;

    }
}