/**
 * Created by thuctvd on 2/9/2017.
 */

import {TankGameLogic} from "./tankgamelogic";
import {Room} from "../model/room";
import {KeyExchange} from "../../share/keyexchange";
import {Main} from "../mainserver";
import {Point} from "../../share/math/primitive";
import {User} from "../model/user";

export  class GameController {
    private gameLogic:TankGameLogic;
    private currentRoom:Room;

    constructor(game:TankGameLogic, room:Room){
        this.gameLogic = game;
        this.currentRoom = room;
    };

    public startGame() {
        var data = {

        };

        this.sendResponseToUsers(data, KeyExchange.KEY_COMMAND.START_GAME, this.currentRoom.getListUsers());
    }

    public move(playerId:number, posPoint:Point, direction:number) {
        var userMove:User = this.currentRoom.getUserByPlayerId(playerId);
        userMove.player.posPoint = posPoint;

        var data = {
            [KeyExchange.KEY_DATA.PLAYER_ID] : playerId,
            [KeyExchange.KEY_DATA.PLAYER_POSITION] : posPoint,
            [KeyExchange.KEY_DATA.PLAYER_DIRECTION] : direction
        };

        this.sendResponseToUsers(data, KeyExchange.KEY_COMMAND.MOVE, this.currentRoom.getListUsers());
    }

    public stopMove(playerId:number, posPoint:Point) {
        var data = {
            [KeyExchange.KEY_DATA.PLAYER_ID] : playerId,
            [KeyExchange.KEY_DATA.PLAYER_POSITION] : posPoint
        };

        this.sendResponseToUsers(data, KeyExchange.KEY_COMMAND.STOP_MOVE, this.currentRoom.getListUsers());
    }

    public playerHitMapItem(status, playerIdAction, rowId, colId, itemId, actionTime) {
        let data = {
            [KeyExchange.KEY_DATA.STATUS] : status,
            [KeyExchange.KEY_DATA.MAP_ITEM_ID] : itemId,
            [KeyExchange.KEY_DATA.ROW_ID] : rowId,
            [KeyExchange.KEY_DATA.COL_ID] : colId,
            [KeyExchange.KEY_DATA.PLAYERID_ACTION] : playerIdAction,
            [KeyExchange.KEY_DATA.ACTION_TIME] : actionTime
        };
        this.sendResponseToUsers(data, KeyExchange.KEY_COMMAND.HIT_MAP_ITEM, this.currentRoom.getListUsers());
    }

    public sendResponseToUser(data, cmd, user) {
        var object = {
            command: KeyExchange.KEY_COMMAND.ACTION_IN_GAME,
            sub: cmd,
            data: data
        }

        Main.getInstance().sendUser(object, user);
        console.log("send msg in game --- " + JSON.stringify(object));
    }

    public sendResponseToUsers(data, cmd, users) {
        var object = {
            command: KeyExchange.KEY_COMMAND.ACTION_IN_GAME,
            sub: cmd,
            data: data
        }

        Main.getInstance().sendListUser(object, users);
        console.log("send msg in game --- " + JSON.stringify(object));
    }
}