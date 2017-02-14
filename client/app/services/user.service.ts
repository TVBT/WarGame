/**
 * Created by thinhth2 on 2/6/2017.
 */
import {Injectable} from '@angular/core';
import {User} from "../model/user";
import {KeyExchange} from "../../../share/keyexchange";

@Injectable()
export class UserService {
    private _myUser:User;

    myUser(): User {
        if (!this._myUser) {
            this._myUser = new User();
        }
        return this._myUser;
    }

    getMyPlayerId() {
        let playerInfo = this.myUser().playerInfo;
        return playerInfo ? playerInfo[KeyExchange.KEY_DATA.PLAYER_ID] : -1;
    }
}