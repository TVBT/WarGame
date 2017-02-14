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
    moduleId: module.id,
    selector: 'play-screen',
    templateUrl: './play.screen.html',
    styleUrls: ['./play.screen.css'],
    providers: [TankGame]
})
export class PlayScreen implements AfterViewInit, OnInit {
    @Input()
    data;

    startTime;

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
                        this.game.map.hitBrick(msg.data[KeyExchange.KEY_DATA.COL_ID],
                            msg.data[KeyExchange.KEY_DATA.ROW_ID]);
                        break;
                    case KeyExchange.KEY_COMMAND.MOVE:
                        this.game.onPlayerMove(msg.data);
                        break;
                    case KeyExchange.KEY_COMMAND.STOP_MOVE:
                        this.game.onPlayerStopMove(msg.data);
                        break;
                }
            }
        })
    }

    ngOnInit() {
        //code test
        // this.data = {
        //     [KeyExchange.KEY_DATA.START_GAME_TIME] : 3,
        //     [KeyExchange.KEY_DATA.PLAY_GAME_TIME] : 300,
        // };

        this.startTime = this.data[KeyExchange.KEY_DATA.START_GAME_TIME];
    }

    ngAfterViewInit() {
        this.game.setGameData(this.data, () => {
            // this.game.stopGame();
            this.game.startCountdown(seconds => this.startTime = seconds, this.startTime);
        });
    }
}