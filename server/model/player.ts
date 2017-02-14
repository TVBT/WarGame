import {KeyExchange} from "../../share/keyexchange";
/**
 * Created by vutp on 2/7/2017.
 */

export class Player {
    //general info
    public playerId:number;
    public teamId:number;
    public isReady:boolean;

    //game info
    public x:number;
    public y:number;
    public status:string;

    constructor() {
        this.playerId = -1;
        this.teamId = -1;
        this.isReady = false;
    }

    parseJsonData() {
        var object:any = {
            [KeyExchange.KEY_DATA.PLAYER_ID] : this.playerId,
            [KeyExchange.KEY_DATA.TEAM_ID] : this.teamId,
            [KeyExchange.KEY_DATA.READY_STATUS] : this.isReady ? 1 : 0
        };

        return object;
    }
}