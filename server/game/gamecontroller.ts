/**
 * Created by thuctvd on 2/9/2017.
 */

import {TankGameLogic} from "./tankgamelogic";
import {Room} from "../model/room";
import {KeyExchange} from "../../share/keyexchange";
import {Main} from "../mainserver";

export  class GameController {
    private gameLogic:TankGameLogic;
    private currentRoom:Room;

    constructor(game:TankGameLogic, room:Room){
        this.gameLogic = game;
        this.currentRoom = room;
    };

    startGame() {
        var data = {

        };

        this.sendResponseToUsers(data, KeyExchange.KEY_COMMAND.START_GAME, this.currentRoom.getListUsers());
    }

    move() {
        var data = {
            //x,y
            //hướng
            //playerId
        };

        this.sendResponseToUsers(data, KeyExchange.KEY_COMMAND.MOVE, this.currentRoom.getListUsers());
    }

    stopMove() {
        var data = {
            //x,y
            //hướng
            //playerId
        };

        this.sendResponseToUsers(data, KeyExchange.KEY_COMMAND.STOP_MOVE, this.currentRoom.getListUsers());
    }

    sendResponseToUser(data, cmd, user) {
        var object = {
            command: KeyExchange.KEY_COMMAND.ACTION_IN_GAME,
            sub: cmd,
            data: data
        }

        Main.getInstance().sendUser(object, user);
        console.log("send msg in game --- " + JSON.stringify(object));
    }

    sendResponseToUsers(data, cmd, users) {
        var object = {
            command: KeyExchange.KEY_COMMAND.ACTION_IN_GAME,
            sub: cmd,
            data: data
        }

        Main.getInstance().sendListUser(object, users);
        console.log("send msg in game --- " + JSON.stringify(object));
    }
}