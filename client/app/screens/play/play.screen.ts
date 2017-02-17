/**
 * Created by thinhth2 on 2/6/2017.
 */
import {Component, AfterViewInit, Input, OnInit} from '@angular/core';
import {KeyExchange} from "../../../../share/keyexchange";
import {TankGame} from "../../game/game";
import {UserService} from "../../services/user.service";
import {CommandService} from "../../services/command.service";
import {StateService} from "../../services/state.service";

@Component({
    selector: 'play-screen',
    templateUrl: 'app/screens/play/play.screen.html',
    styleUrls: ['app/screens/play/play.screen.css'],
    providers: [TankGame]
})
export class PlayScreen implements AfterViewInit, OnInit {
    @Input()
    data;

    startTime;
    isDead = false;
    deadTime = 0;
    team1 = [];
    team2 = [];

    constructor(private userService:UserService,
                private commandService:CommandService,
                private stateService:StateService,
                private game:TankGame) {
        this.commandService.onMessage.subscribe((msg) => {
            if (msg.command == KeyExchange.KEY_COMMAND.ACTION_IN_GAME) {
                let subCommand = msg.sub;
                switch (subCommand) {
                    case KeyExchange.KEY_COMMAND.START_GAME:
                        // this.game.resumeGame();
                        break;
                    case KeyExchange.KEY_COMMAND.HIT_MAP_ITEM:
                        this.game.map.removeBrick(msg.data[KeyExchange.KEY_DATA.COL_ID],
                            msg.data[KeyExchange.KEY_DATA.ROW_ID]);
                        this.game.forceBulletExplosion(msg.data[KeyExchange.KEY_DATA.PLAYERID_ACTION],
                            msg.data[KeyExchange.KEY_DATA.BULLET_ID]);
                        break;
                    case KeyExchange.KEY_COMMAND.MOVE:
                        this.game.onPlayerMove(msg.data);
                        break;
                    case KeyExchange.KEY_COMMAND.STOP_MOVE:
                        this.game.onPlayerStopMove(msg.data);
                        break;
                    case KeyExchange.KEY_COMMAND.HIT_TANK:
                        this.game.onHitTank(msg.data);
                        this.game.forceBulletExplosion(msg.data[KeyExchange.KEY_DATA.PLAYERID_SHOOT],
                            msg.data[KeyExchange.KEY_DATA.BULLET_ID]);

                        if (msg.data[KeyExchange.KEY_DATA.PLAYERID_BE_SHOOT] == this.userService.getMyPlayerId()) {
                            this.deadTime = msg.data[KeyExchange.KEY_DATA.REBORN_TIME]/1000;
                            this.game.startCountdown(this.deadTime, seconds => this.deadTime = seconds, () => {
                                this.commandService.reborn(this.userService.getMyPlayerId());
                            });
                            this.isDead = true;
                        }
                        break;
                    case KeyExchange.KEY_COMMAND.SHOOT:
                        this.game.onPlayerShoot(msg.data);
                        break;
                    case KeyExchange.KEY_COMMAND.REBORN:
                        this.isDead = false;
                        this.game.onPlayerReborn(msg.data);
                        break;
                }
            }
        })
    }

    ngOnInit() {
        this.startTime = this.data[KeyExchange.KEY_DATA.PLAY_GAME_TIME]/1000;

        let listPlayerInfo = this.data[KeyExchange.KEY_DATA.LIST_PLAYER_INFO];
        let team1Id = -1, team2Id = -1, team1 = [], team2 = [], myInfo;
        for (let i = 0; i < listPlayerInfo.length; i++) {
            let info = listPlayerInfo[i];
            if (info[KeyExchange.KEY_DATA.PLAYER_ID] == this.userService.getMyPlayerId()) {
                myInfo = info;
            }
            if (i == 0 || info[KeyExchange.KEY_DATA.TEAM_ID] == team1Id) {
                team1.push(info);
                team1Id = info[KeyExchange.KEY_DATA.TEAM_ID];
            } else if (info[KeyExchange.KEY_DATA.TEAM_ID] != team1Id) {
                team2.push(info);
                team2Id = info[KeyExchange.KEY_DATA.TEAM_ID];
            }
        }
        if (team1Id < team2Id) {
            this.team1 = team1;
            this.team2 = team2;
        } else {
            this.team1 = team2;
            this.team2 = team1;
        }
        for (let info of listPlayerInfo) {
            if (info !== myInfo) {
                info.isOp = (info[KeyExchange.KEY_DATA.TEAM_ID] != myInfo[KeyExchange.KEY_DATA.TEAM_ID])
            } else {
                info.isMe = true;
            }
        }
    }

    ngAfterViewInit() {
        this.game.setGameData(this.data, () => {
            // this.game.stopGame();
            this.game.startCountdown(this.startTime, seconds => this.startTime = seconds);
        });
    }
}