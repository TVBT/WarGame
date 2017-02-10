/**
 * Created by thuctvd on 2/9/2017.
 */

import {GameController} from './gamecontroller';
import {Room} from "../model/room";
import {MapManager} from "./map/mapmanager";

export class TankGameLogic {
    public controller: GameController;

    private currentRoom:Room;
    public mapManager:MapManager;

    constructor (room:Room) {
        this.controller = new GameController(this);
        this.currentRoom = room;
    };

    public startGame(mapId:number) {
        this.initMapInfo(mapId);
    }

    private initMapInfo(mapId: number) {
        this.mapManager.createMap(mapId);
    }

    /**
     * Get data map hiện tại
     * @returns {Array}
     */
    public getMapData() :Array<any> {
        return this.mapManager.mapData;
    }

    public getPlayerData() :Array<any> {
        return [];
    }

}