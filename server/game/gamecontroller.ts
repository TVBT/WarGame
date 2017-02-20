/**
 * Created by thuctvd on 2/9/2017.
 */

import {TankGameLogic} from "./tankgamelogic";
import {Room} from "../model/room";
import {KeyExchange} from "../../share/keyexchange";
import {Main} from "../mainserver";
import {Point} from "../../share/math/primitive";
import {User} from "../model/user";
import {ConfigManager} from "../manager/configmanager";

export  class GameController {
    private gameLogic:TankGameLogic;
    private currentRoom:Room;

    constructor(game:TankGameLogic, room:Room){
        this.gameLogic = game;
        this.currentRoom = room;
    };

    public startGame() {
        let data = {

        };

        this.sendResponseToUsers(data, KeyExchange.KEY_COMMAND.START_GAME, this.currentRoom.getListUsers());
    }

    public move(playerId:number, posPoint, direction) {
        let userMove:User = this.currentRoom.getUserByPlayerId(playerId);
        userMove.player.pos = posPoint;

        var data = {
            [KeyExchange.KEY_DATA.PLAYER_ID] : playerId,
            [KeyExchange.KEY_DATA.PLAYER_POSITION] : posPoint,
            [KeyExchange.KEY_DATA.PLAYER_DIRECTION] : direction
        };

        this.sendResponseToUsers(data, KeyExchange.KEY_COMMAND.MOVE, this.currentRoom.getListUsers());
    }

    public stopMove(playerId:number, posPoint:Point) {
        let data = {
            [KeyExchange.KEY_DATA.PLAYER_ID] : playerId,
            [KeyExchange.KEY_DATA.PLAYER_POSITION] : posPoint
        };

        this.sendResponseToUsers(data, KeyExchange.KEY_COMMAND.STOP_MOVE, this.currentRoom.getListUsers());
    }

    public playerHitMapItem(status, playerIdAction, rowId, colId, itemId, actionTime, idBullet) {
        let data = {
            [KeyExchange.KEY_DATA.STATUS] : status,
            [KeyExchange.KEY_DATA.MAP_ITEM_ID] : itemId,
            [KeyExchange.KEY_DATA.ROW_ID] : rowId,
            [KeyExchange.KEY_DATA.COL_ID] : colId,
            [KeyExchange.KEY_DATA.BULLET_ID] : idBullet,
            [KeyExchange.KEY_DATA.PLAYERID_ACTION] : playerIdAction,
            [KeyExchange.KEY_DATA.ACTION_TIME] : actionTime
        };
        this.sendResponseToUsers(data, KeyExchange.KEY_COMMAND.HIT_MAP_ITEM, this.currentRoom.getListUsers());
    }

    public playerShoot(playerIdAction, playerPos, direction, actionTime, idBullet) {
        let data = {
            [KeyExchange.KEY_DATA.PLAYERID_ACTION] : playerIdAction,
            [KeyExchange.KEY_DATA.PLAYER_POSITION] : playerPos,
            [KeyExchange.KEY_DATA.BULLET_DIRECTION] : direction,
            [KeyExchange.KEY_DATA.BULLET_ID] : idBullet,
            [KeyExchange.KEY_DATA.ACTION_TIME] : actionTime
        };

        this.sendResponseToUsers(data, KeyExchange.KEY_COMMAND.SHOOT, this.currentRoom.getListUsers());
    }

    public playerHitTank(playerIdShoot, playerIdBeShoot, actionTime, idBullet) {
        var userBeShoot:User = this.currentRoom.getUserByPlayerId(playerIdBeShoot);
        userBeShoot.player.status = KeyExchange.TANK_PLAYER_STATUS.DEAD;
        userBeShoot.player.deadTime = Date.now();

        let status = 1;

        let data = {
            [KeyExchange.KEY_DATA.STATUS] : status,
            [KeyExchange.KEY_DATA.PLAYERID_SHOOT] : playerIdShoot,
            [KeyExchange.KEY_DATA.BULLET_ID] : idBullet,
            [KeyExchange.KEY_DATA.PLAYERID_BE_SHOOT] : playerIdBeShoot,
            [KeyExchange.KEY_DATA.ACTION_TIME] : actionTime,
            [KeyExchange.KEY_DATA.REBORN_TIME] : ConfigManager.getInstance().rebornTime
        };

        this.sendResponseToUsers(data, KeyExchange.KEY_COMMAND.HIT_TANK, this.currentRoom.getListUsers());
    }

    public playerHitTower(teamIdLose) {
        let data = {
            [KeyExchange.KEY_DATA.TEAM_ID] : teamIdLose,
        };

        this.sendResponseToUsers(data, KeyExchange.KEY_COMMAND.HIT_TOWER, this.currentRoom.getListUsers());
        this.endGame(this.getTeamIdWin(teamIdLose), teamIdLose);
    }

    public playerReborn(userReborn:User) {
        if (Date.now() - userReborn.player.deadTime < ConfigManager.getInstance().rebornTime) {
            return;
        }

        let status = userReborn.player.status == KeyExchange.TANK_PLAYER_STATUS.DEAD;
        userReborn.player.status = KeyExchange.TANK_PLAYER_STATUS.ALIVE;
        let playerIndex = this.currentRoom.getPlayerIndexByPlayerId(userReborn.player.playerId);

        let data = {
            [KeyExchange.KEY_DATA.STATUS] : status ? 1 : 0,
            [KeyExchange.KEY_DATA.PLAYER_ID] : userReborn.player.playerId,
            [KeyExchange.KEY_DATA.PLAYER_POSITION] : ConfigManager.getInstance().getPosPlayerBy(userReborn.player.teamId, playerIndex)
        };

        this.sendResponseToUsers(data, KeyExchange.KEY_COMMAND.REBORN, this.currentRoom.getListUsers());
    }

    private endGame(teamIdWin, teamIdLose) {
        let data = {
            [KeyExchange.KEY_DATA.TEAM_ID_WIN] : teamIdWin,
            [KeyExchange.KEY_DATA.TEAM_ID_LOSE] : teamIdLose,
        };

        this.sendResponseToUsers(data, KeyExchange.KEY_COMMAND.END_GAME, this.currentRoom.getListUsers());
    }

    public getTeamIdWin(teamId) {
        switch (teamId) {
            case 1:
                return 2;

            case 2:
                return 1;

            default:
                return 0;
        }
    }

    public sendResponseToUser(data, cmd, user) {
        let object = {
            command: KeyExchange.KEY_COMMAND.ACTION_IN_GAME,
            sub: cmd,
            data: data
        }

        Main.getInstance().sendUser(object, user);
        console.log("SEND msg ingame --- " + JSON.stringify(object));
    }

    public sendResponseToUsers(data, cmd, users) {
        let object = {
            command: KeyExchange.KEY_COMMAND.ACTION_IN_GAME,
            sub: cmd,
            data: data
        }

        Main.getInstance().sendListUser(object, users);
        console.log("SEND msg ingame --- " + JSON.stringify(object));
    }
}