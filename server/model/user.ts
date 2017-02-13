import {Player} from "../game/player";
import {Room} from "./room";
import {KeyExchange} from "../../share/keyexchange";
/**
 * Created by vutp on 2/9/2017.
 */

export class User {
    public client:any;
    public userId:number;
    public userName:string;
    public player:Player;
    public room:Room;

    constructor() {
        this.userId = -1;
        this.userName = "";
    }

    setPlayer(player:Player) {
        this.player = player;
    }

    parseJsonDataPlayer() {
        var obj:any = this.player.parseJsonData();
        obj[KeyExchange.KEY_DATA.USER_NAME] = this.userName;

        return obj;
    }
}