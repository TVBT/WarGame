import {TankGameLogic} from "./tankgamelogic";
import {Room} from "../model/room";
import {User} from "../model/user";
/**
 * Created by thuctvd on 2/9/2017.
 */
export  class GameController {
    private gameLogic:TankGameLogic;
    private currentRoom:Room;

    constructor(game:TankGameLogic, room:Room){
        this.gameLogic = game;
        this.currentRoom = room;
    };

    sendPlayerMove() {

    }

}