/**
 * Created by thinhth2 on 2/6/2017.
 */
import {Injectable, EventEmitter} from '@angular/core';
import {StateService} from "./state.service";
import {KeyExchange} from "../../../share/keyexchange";

@Injectable()
export class CommandService {
    socket;
    socketReady = false;
    onMessage = new EventEmitter();
    socketReadyListener = new EventEmitter();

    constructor(private stateService:StateService) {

    }

    start() {
        // var url = 'ws://10.8.14.205:9191/'; // a Vũ
        var url = 'ws://127.0.0.1:9191/'; // localhost
        // var url = 'ws://10.8.14.200:9191/'; // a Thức
        this.socket = io(url);
        this.socket.on('connect', () => {
            this.socketReady = true;
            this.stateService.showLogin();
            this.socketReadyListener.emit();
        });
        this.socket.on('event', this.handleMessage.bind(this));
        this.socket.on('disconnect', () => {
            this.socketReady = false;
            alert("Mất kết nối");
            this.stateService.showLogin();
        });
    }

    verifyUsername(username) {
        this.socket.emit("event", {
            command: KeyExchange.KEY_COMMAND.CHECK_NICK_NAME,
            data: {
                [KeyExchange.KEY_DATA.USER_NAME]: username
            }
        });
    }

    autoJoinRoom(username) {
        this.socket.emit("event", {
            command: KeyExchange.KEY_COMMAND.AUTO_JOIN_ROOM,
            data: {
                [KeyExchange.KEY_DATA.USER_NAME]: username
            }
        });
    }

    getRoomInfo(roomId) {
        this.socket.emit("event", {
            command: KeyExchange.KEY_COMMAND.GET_ROOM_INFO,
            data: {
                [KeyExchange.KEY_DATA.ROOM_ID]: roomId
            }
        });
    }

    userReady() {
        this.socket.emit("event", {
            command: KeyExchange.KEY_COMMAND.USER_READY,
            data: {}
        });
    }

    changeTeam() {
        this.socket.emit("event", {
            command: KeyExchange.KEY_COMMAND.CHANGE_TEAM,
            data: {}
        });
    }

    hitMapItem(iCol, iRow, itemId) {
        this.socket.emit("event", {
            command: KeyExchange.KEY_COMMAND.ACTION_IN_GAME,
            sub: KeyExchange.KEY_COMMAND.HIT_MAP_ITEM,
            data: {
                [KeyExchange.KEY_DATA.ROW_ID]: iRow,
                [KeyExchange.KEY_DATA.COL_ID]: iCol,
                [KeyExchange.KEY_DATA.MAP_ITEM_ID]: itemId,
                [KeyExchange.KEY_DATA.ACTION_TIME]: Date.now()
            }
        });
    }

    handleMessage(msg) {
        if (this.socketReady) {
            this.onMessage.emit(msg);
            console.log(msg);
        }
    }

    move(playerId, position, velocity) {
        this.socket.emit("event", {
            command: KeyExchange.KEY_COMMAND.ACTION_IN_GAME,
            sub: KeyExchange.KEY_COMMAND.MOVE,
            data: {
                [KeyExchange.KEY_DATA.PLAYER_ID]: playerId,
                [KeyExchange.KEY_DATA.PLAYER_POSITION]: position,
                [KeyExchange.KEY_DATA.PLAYER_DIRECTION]: velocity
            }
        });
    }

    // unused
    stopMove(playerId, position) {
        this.socket.emit("event", {
            command: KeyExchange.KEY_COMMAND.ACTION_IN_GAME,
            sub: KeyExchange.KEY_COMMAND.STOP_MOVE,
            data: {
                [KeyExchange.KEY_DATA.PLAYER_ID]: playerId,
                [KeyExchange.KEY_DATA.PLAYER_POSITION]: position
            }
        });
    }

    ping() {
        this.socket.emit("event", {
            command: KeyExchange.KEY_COMMAND.PING_PONG,
            data: {}
        });
    }

    shoot(playerId, playerPosition, bulletDirection) {
        this.socket.emit("event", {
            command: KeyExchange.KEY_COMMAND.ACTION_IN_GAME,
            sub: KeyExchange.KEY_COMMAND.SHOOT,
            data: {
                [KeyExchange.KEY_DATA.PLAYER_POSITION]: playerPosition,
                [KeyExchange.KEY_DATA.BULLET_DIRECTION]: bulletDirection,
                [KeyExchange.KEY_DATA.ACTION_TIME]: Date.now()
            }
        });
    }
}