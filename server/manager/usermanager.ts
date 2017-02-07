/**
 * Created by vutp on 2/7/2017.
 */

export class UserManager {
    public clients = {};
    public userNameArr = [];

    static _instance: UserManager;

    static getInstance() : UserManager {
        if (!UserManager._instance) {
            UserManager._instance = new UserManager();
        }

        return UserManager._instance;
    }

    addUser(clientId, userInfo) {
        this.clients[clientId] = userInfo;
    }

    removeUser(clientId) {
        this.clients[clientId] = null;
    }

    getAllUsers() {
        return this.clients;
    }

    getUserById(clientId) {
        return this.clients[clientId];
    }

    addUserName(userName) {
        if (this.userNameArr.indexOf(userName) < 0) {
            this.userNameArr.push(userName);
        }
    }

    removeUserName(userName) {
        var index = this.userNameArr.indexOf(userName);
        if (index >= 0) {
            this.userNameArr.splice(index, 1);
        }
    }

    checkValidNickName(userName) {
        var i = 0;
        var len = this.userNameArr.length;

        for (i; i < len; i++) {
            if (this.userNameArr[i] == userName) {
                return false;
            }
        }

        return true;
    }

}