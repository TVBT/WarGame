/**
 * Created by vutp on 2/7/2017.
 */

import {Room} from "../model/room";
import {User} from "../model/user";

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

    joinRoom(user:User) {
        var room:Room = this.getRoomValid();
        if (room == null) {
            room = this.createRoom();
        }

        room.addUser(user);
        user.room = room;

        return room;
    }

    leaveRoom(user:User) {
        var room:Room = user.room;
        if (room) {
            room.removeUser(user);
        }
    }

    getRoomValid() {
        var i = 0;
        var len = this.rooms.length;

        for (i; i < len; i++) {
            var room:Room = this.rooms[i];
            if (!room.isPlaying && !room.isFull()) {
                return room;
            }
        }

        return null;
    }

    createRoom() {
        var room:Room = new Room();
        room.roomId = this.automicRoomId;
        room.roomName = "Default_" + this.automicRoomId;
        this.rooms.push(room);
        this.automicRoomId++;

        return room;
    }

    removeRoom(roomId) {
        var room:Room = this.getRoomById(roomId);
        var index:number = this.rooms.indexOf(room);

        if (index >= 0) {
            this.rooms.splice(index, 1);
        }
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