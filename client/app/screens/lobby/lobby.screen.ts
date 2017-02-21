/**
 * Created by thinhth2 on 2/6/2017.
 */
import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {UserService} from "../../services/user.service";
import {CommandService} from "../../services/command.service";
import {KeyExchange} from "../../../../share/keyexchange";
import {StateService} from "../../services/state.service";

@Component({
    selector: 'lobby-screen',
    templateUrl: 'lobby.screen.html',
    styleUrls: ['lobby.screen.css']
})
export class LobbyScreen implements OnInit, OnDestroy {

    @Input()
    data;

    team1 = {id: 0, members: []};
    team2 = {id: 1, members: []};

    totalPlayers = [];
    disableButtons = false;
    subscription;

    constructor(private userService:UserService,
                private commandService:CommandService,
                private stateService:StateService) {

    }

    ngOnInit() {
        this.subscription = this.commandService.onMessage.subscribe((msg) => {
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
                case KeyExchange.KEY_COMMAND.USER_LEAVE_LOBBY_ROOM:
                    this.onUserLeaveLobby(msg.data);
                    break;
                case KeyExchange.KEY_COMMAND.JOIN_GAME:
                    this.onUserJoinGame(msg.data);
                    break;
            }
        });

        var user = this.userService.myUser();
        this.commandService.getRoomInfo(user.roomId);
    }

    ngOnDestroy():void {
        this.subscription.isStopped = true;
        this.subscription.closed = true;
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
        var myUser = this.userService.myUser();
        if (myUser.playerInfo[KeyExchange.KEY_DATA.PLAYER_ID] == playerId && status) {
            this.disableButtons = true;
        }
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

    private onUserLeaveLobby(data) {
        var playerId = data[KeyExchange.KEY_DATA.PLAYER_ID];
        var clearMember = (team) => {
            for (let member of team.members) {
                if (member[KeyExchange.KEY_DATA.PLAYER_ID] == playerId) {
                    team.members.splice(team.members.indexOf(member), 1);
                    this.totalPlayers.splice(this.totalPlayers.indexOf(member), 1);
                }
            }
        };

        clearMember(this.team1);
        clearMember(this.team2);
    }

    private onUserChangeTeam(data) {
        var playerId = data[KeyExchange.KEY_DATA.PLAYER_ID];
        var status = data[KeyExchange.KEY_DATA.READY_STATUS];
        if (status) return;

        var changeTeam = (team1, team2) => {
            for (let member of team1.members) {
                if (member[KeyExchange.KEY_DATA.PLAYER_ID] == playerId) {
                    team1.members.splice(this.team1.members.indexOf(member), 1);
                    this.totalPlayers.splice(this.totalPlayers.indexOf(member), 1);
                    team2.members.push(member);
                    this.totalPlayers.push(member);
                    return true;
                }
            }
        };

        var changed = changeTeam(this.team1, this.team2);
        if (!changed) {
            changeTeam(this.team2, this.team1);
        }
    }

    private onChangeTeamClick() {
        this.commandService.changeTeam();
    }

    private onUserJoinGame(data:any) {
        this.stateService.showPlay(data);
    }
}