import {UserInfo} from "./userinfo";
import {Player} from "../game/player";
import {Room} from "./room";
/**
 * Created by vutp on 2/9/2017.
 */

export class User {
    public client:any;
    public userInfo:UserInfo;
    public player:Player;
    public room:Room;

    constructor() {
        this.userInfo = new UserInfo();
    }

    setUserInfo(userInfo) {
        this.userInfo = userInfo;
    }

    setPlayer(player:Player) {
        this.player = player;
    }
}