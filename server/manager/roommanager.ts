import {PlayerInfo} from "../game/playerinfo";
import {RoomInfo} from "../model/roominfo";
/**
 * Created by vutp on 2/7/2017.
 */

export class RoomManager {
    public rooms = [];
    private automicRoomId = 1000;

    static _instance:RoomManager;

    static getInstance():RoomManager {
        if (!RoomManager._instance) {
            RoomManager._instance = new RoomManager();
        }

        return RoomManager._instance;
    }

    joinRoom(userInfo) {
        var roomInfo = this.getRoomValid();
        if (roomInfo == null) {
            roomInfo = this.createRoom();
        }

        var playerInfo = new PlayerInfo(userInfo);
        roomInfo.addPlayer(playerInfo);

        return roomInfo;
    }

    getRoomValid() {
        var i = 0;
        var len = this.rooms.length;

        for (i; i < len; i++) {
            var roomInfo = this.rooms[i];
            if (!roomInfo.isFull) {
                return roomInfo;
            }
        }

        return null;
    }

    createRoom() {
        var roomInfo = new RoomInfo();
        roomInfo.roomId = this.automicRoomId;
        roomInfo.roomName = "Default_" + this.automicRoomId;
        this.rooms.push(roomInfo);
        this.automicRoomId++;

        return roomInfo;
    }

    removeRoom(roomId) {

    }

    getRoomById(roomId) {
        var i = 0;
        var len = this.rooms.length;

        for (i; i < len; i++) {
            if (this.rooms[i].roomId == roomId) {
                return this.rooms[i];
            }
        }

        return null;
    }
}