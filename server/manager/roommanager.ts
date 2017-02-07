/**
 * Created by vutp on 2/7/2017.
 */

export class RoomManager {
    static _instance:RoomManager;

    static getInstance():RoomManager {
        if (!RoomManager._instance) {
            RoomManager._instance = new RoomManager();
        }

        return RoomManager._instance;
    }
}