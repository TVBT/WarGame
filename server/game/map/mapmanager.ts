import {ConfigManager} from "../../manager/configmanager";
import {KeyExchange} from "../../../share/keyexchange";
/**
 * Created by thuctvd on 2/9/2017.
 */


export class MapManager {
    public mapData = [];
    public id:number;
    private config = ConfigManager.getInstance();

    createMap(mapId:number) {
        this.id = mapId;
        this.mapData = this.config.MAP_LIST[mapId];
    }

    /**
     * Từ vị trí dòng, cột -> ánh xạ vào mảng MAP
     * @param row
     * @param col
     * @returns {number}
     */
    getIndexByRowAndCol(row:number, col:number):number{
        return (this.config.MAP_NUM_COL * row) + col;
    }

    parseJsonDataMapInfo() {
        var object = {
            [KeyExchange.KEY_DATA.MAP_ID] : this.id,
        };

        return object;
    }
}