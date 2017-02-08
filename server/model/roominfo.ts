import {KeyExchange} from "../../share/keyexchange";
/**
 * Created by vutp on 2/7/2017.
 */

export class RoomInfo {
    public roomId: number;
    public roomName: string;
    public roomType: number;        // 0: room lobby, 1 : room game
    public maxPlayer:number;
    public listPlayer1: any;
    public listPlayer2: any;
    private automicPlayerId:number;

    constructor() {
        this.roomId = -1;
        this.roomName = "";
        this.roomType = 0;
        this.maxPlayer = 50;

        this.listPlayer1 = [];
        this.listPlayer2 = [];

        this.automicPlayerId = 1;
    }

    addPlayer(playerInfo) {
        playerInfo.playerId = this.automicPlayerId;

        var numPlayer1 = this.listPlayer1.length;
        var numPlayer2 = this.listPlayer2.length;

        if (numPlayer1 == numPlayer2) {
            this.listPlayer1.push(playerInfo);
        } else if (numPlayer1 > numPlayer2) {
            this.listPlayer2.push(playerInfo);
        }

        this.automicPlayerId++;
    }

    removePlayer(player) {

    }

    isFull() {
        return (this.listPlayer1.length + this.listPlayer2.length == this.maxPlayer);
    }

    getTotalPlayer() {
        return (this.listPlayer1.length + this.listPlayer2.length);
    }

    parseJsonData() {
        var object = {
            data : {
                [KeyExchange.KEY_DATA.PLAYER_LIST] : this.parseJsonPlayerList(),
                [KeyExchange.KEY_DATA.ROOM_NAME] : this.roomName,
                [KeyExchange.KEY_DATA.TOTAL_PLAYER] : this.getTotalPlayer()
            }
        };

        return object;
    }

    parseJsonPlayerList() {
        var playerTeam1 = this.getListPlayerObject(this.listPlayer1);
        var playerTeam2 = this.getListPlayerObject(this.listPlayer2);

        var listPlayer = [playerTeam1, playerTeam2];

        return listPlayer;
    }

    getListPlayerObject(listPlayer) {
        var i = 0;
        var len = listPlayer.length;
        var arrObject = [];

        for (i; i < len; i++) {
            arrObject.push(listPlayer[i].parseJsonData());
        }

        return arrObject;
    }
}