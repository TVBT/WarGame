/**
 * Created by thinhth2 on 2/6/2017.
 */
import { Injectable } from '@angular/core';
import {User} from "../model/user";

@Injectable()
export class UserService {
    private _myUser:User;

    myUser(): User {
        if (!this._myUser) {
            this._myUser = new User();
        }
        return this._myUser;
    }
}