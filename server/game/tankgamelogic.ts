/**
 * Created by thuctvd on 2/9/2017.
 */

import {GameController} from './gamecontroller';
import {Room} from "../model/room";
import {MapManager} from "./map/mapmanager";
import {Main} from "../mainserver";
import {ConfigManager} from "../manager/configmanager";
import {KeyExchange} from "../../share/keyexchange";

export class TankGameLogic {
    public controller: GameController;

    private currentRoom:Room;
    public mapManager:MapManager;

    constructor (room:Room) {
        this.controller = new GameController(this);
        this.currentRoom = room;
    };

    public startGame() {
        setTimeout(function () {
            var data = {

            };

            this.sendResponseToUsers(data, KeyExchange.KEY_COMMAND.START_GAME, this.currentRoom.getListUsers());
        }.bind(this), ConfigManager.getInstance().startGameTime * 1000);
    }

    handleActionInGame(subId, data, client) {
        switch (subId) {
            case KeyExchange.KEY_COMMAND.MOVE:
                this.handlePlayerMove(data, client);
                break;
        }

    }

    handlePlayerMove(data, client) {

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