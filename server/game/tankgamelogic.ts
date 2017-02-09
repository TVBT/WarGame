/**
 * Created by thuctvd on 2/9/2017.
 */

import {GameController} from './gamecontroller';
import {GameConfig} from './gameconfig';
import {Room} from "../model/room";
import {MapManager} from "./map/mapmanager";

export class TankGameLogic {
    public controller: GameController;
    private config:GameConfig;
    private currentRoom:Room;
    private mapController:MapManager;

    constructor (room:Room) {
        this.controller = new GameController(this);
        this.currentRoom = room;
    };

    public startGame() {
        this.initGameInfo();
        this.createMap();

    }

    private initGameInfo() {

    }

    private createMap() {

    }
}