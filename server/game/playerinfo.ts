import {UserInfo} from "../model/userinfo";
import {KeyExchange} from "../../share/keyexchange";
/**
 * Created by vutp on 2/7/2017.
 */

export class PlayerInfo {
    public userInfo: any;
    public playerId: number;
    public isReady: boolean;

    constructor(userInfo:UserInfo) {
        this.userInfo = userInfo;
        this.playerId = -1;
        this.isReady = false;
    }

    parseJsonData() {
        var object = {
            [KeyExchange.KEY_DATA.PLAYER_ID] : this.playerId,
            [KeyExchange.KEY_DATA.READY_STATUS] : this.isReady,
            [KeyExchange.KEY_DATA.TEAM_ID] : this.userInfo.teamId,
        };

        return object;
    }
}