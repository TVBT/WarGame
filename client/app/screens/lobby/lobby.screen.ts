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
    team1 = {id: 0, members: []};
    team2 = {id: 1, members: []};

    totalPlayers = [];

    constructor(private userService:UserService,
                private commandService:CommandService) {
        this.commandService.onMessage.subscribe((msg) => {
            switch (msg.command) {
                case KeyExchange.KEY_COMMAND.GET_ROOM_INFO:
                    this.onGetRoomInfo(msg.data);
                    break;
                case KeyExchange.KEY_COMMAND.USER_READY:
                    this.onUserReady(msg.data);
                    break;
                case KeyExchange.KEY_COMMAND.USER_JOIN_LOBBY_ROOM:
                    this.onUserJoinLobby(msg.data);
                    break;
                case KeyExchange.KEY_COMMAND.CHANGE_TEAM:
                    this.onUserChangeTeam(msg.data);
                    break;
            }
        })
    }

    ngOnInit() {
        var user = this.userService.myUser();
        this.commandService.getRoomInfo(user.roomId);
    }

    private onGetRoomInfo(data) {
        this.totalPlayers = [];
        var teams = [];
        for (let teamId in data.playerlist) {
            if (data.playerlist.hasOwnProperty(teamId)) {
                let team = data.playerlist[teamId];
                this.totalPlayers = this.totalPlayers.concat(team);
                teams.push({id: teamId, members: team});
            }
        }

        [this.team1, this.team2] = teams;
    }

    private onUserReady(data) {
        var status = data[KeyExchange.KEY_DATA.READY_STATUS];
        var playerId = data[KeyExchange.KEY_DATA.PLAYER_ID];
        for (let player of this.totalPlayers) {
            if (player[KeyExchange.KEY_DATA.PLAYER_ID] == playerId) {
                player.readystatus = status;
            }
        }
    }

    private onReadyClick(data) {
        this.commandService.userReady();
    }

    private onUserJoinLobby(data) {
        var teamId = data[KeyExchange.KEY_DATA.TEAM_ID];
        if (this.team1.id == teamId) {
            this.team1.members.push(data);
        } else if (this.team2.id == teamId) {
            this.team2.members.push(data);
        }

        this.totalPlayers.push(data);
    }

    private onUserChangeTeam(data) {
        var playerId = data[KeyExchange.KEY_DATA.PLAYER_ID];
        var changeTeam = (team1, team2) => {
            for(let member of team1.members) {
                if (member[KeyExchange.KEY_DATA.PLAYER_ID] == playerId) {
                    team2.members.push(data);
                    team1.members.splice(this.team1.members.indexOf(member), 1);
                    return true;
                }
            }
        }

        var changed = changeTeam(this.team1, this.team2);
        if (!changed) {
            changeTeam(this.team2, this.team1);
        }
    }

    private onChangeTeamClick() {
        this.commandService.changeTeam();
    }
}